import { getStats, saveStats, getAchievements, saveAchievements, getDailyMissions, saveDailyMissions, addToLeaderboard, unlockSkin, getUnlockedSkins } from './StorageManager';
import { ACHIEVEMENTS, checkAchievementUnlock } from '../constants/Achievements';
import { SKINS } from '../constants/GameConfig';

/**
 * GameSessionTracker - Tracks game session data and updates storage
 */
class GameSessionTracker {
    constructor() {
        this.sessionStartTime = null;
        this.sessionData = {
            score: 0,
            aiKills: 0,
            level: 1,
            snakeLength: 0,
            powerupsCollected: {},
        };
    }

    // Start a new game session
    startSession() {
        this.sessionStartTime = Date.now();
        this.sessionData = {
            score: 0,
            aiKills: 0,
            level: 1,
            snakeLength: 0,
            powerupsCollected: {},
        };
    }

    // Update session data during gameplay
    updateScore(score) {
        this.sessionData.score = score;
    }

    updateLevel(level) {
        this.sessionData.level = level;
    }

    updateSnakeLength(length) {
        this.sessionData.snakeLength = Math.max(this.sessionData.snakeLength, length);
    }

    incrementAIKills() {
        this.sessionData.aiKills++;
    }

    incrementPowerup(powerupId) {
        this.sessionData.powerupsCollected[powerupId] = (this.sessionData.powerupsCollected[powerupId] || 0) + 1;
    }

    // End session and save all data
    async endSession() {
        if (!this.sessionStartTime) return;

        const playtime = Math.floor((Date.now() - this.sessionStartTime) / 1000); // seconds
        const { score, aiKills, level, snakeLength } = this.sessionData;

        // 1. Update Stats
        const stats = (await getStats()) || { totalGames: 0, totalScore: 0, bestScore: 0, totalAIKills: 0, longestSnake: 0, highestLevel: 0, totalPlaytime: 0 };
        const newStats = {
            totalGames: stats.totalGames + 1,
            bestScore: Math.max(stats.bestScore, score),
            totalScore: stats.totalScore + score,
            totalAIKills: stats.totalAIKills + aiKills,
            longestSnake: Math.max(stats.longestSnake, snakeLength),
            highestLevel: Math.max(stats.highestLevel, level),
            totalPlaytime: stats.totalPlaytime + playtime,
        };
        await saveStats(newStats);

        // 2. Check & Unlock Achievements
        await this.checkAchievements(newStats);

        // 3. Update Daily Missions
        await this.updateMissions();

        // 4. Add to Leaderboard
        await addToLeaderboard({
            score,
            level,
            aiKills,
            snakeLength,
            timestamp: Date.now(),
        });

        // 5. Check for skin unlocks
        await this.checkSkinUnlocks(newStats);

        // Reset session
        this.sessionStartTime = null;
    }

    // Check and unlock achievements
    async checkAchievements(stats) {
        const achievementsData = await getAchievements();
        const newUnlocks = [];

        for (const achievement of ACHIEVEMENTS) {
            // Skip if already unlocked
            if (achievementsData[achievement.id]?.unlocked) continue;

            // Check unlock condition
            const isUnlocked = checkAchievementUnlock(achievement, stats, this.sessionData);

            if (isUnlocked) {
                achievementsData[achievement.id] = {
                    unlocked: true,
                    unlockedAt: Date.now(),
                    progress: achievement.requirement.value,
                };
                newUnlocks.push(achievement);
            } else {
                // Update progress
                let progress = 0;
                const { type, value } = achievement.requirement;

                switch (type) {
                    case 'score':
                        progress = stats.bestScore;
                        break;
                    case 'total_score':
                        progress = stats.totalScore;
                        break;
                    case 'ai_kills':
                        progress = stats.totalAIKills;
                        break;
                    case 'games_played':
                        progress = stats.totalGames;
                        break;
                    case 'level':
                        progress = stats.highestLevel;
                        break;
                    case 'snake_length':
                        progress = stats.longestSnake;
                        break;
                    default:
                        progress = 0;
                }

                achievementsData[achievement.id] = {
                    unlocked: false,
                    progress: Math.min(progress, value),
                };
            }
        }

        await saveAchievements(achievementsData);
        return newUnlocks;
    }

    // Update daily mission progress
    async updateMissions() {
        const missions = await getDailyMissions();
        if (!missions || !missions.missions) return;

        let updated = false;
        const { score, aiKills, level } = this.sessionData;

        for (const mission of missions.missions) {
            if (mission.completed) continue;

            const { type, value } = mission.requirement;
            let newProgress = mission.progress || 0;

            switch (type) {
                case 'score':
                    if (score >= value) {
                        newProgress = value;
                        mission.completed = true;
                        updated = true;
                    }
                    break;
                case 'ai_kills':
                    newProgress = Math.min(newProgress + aiKills, value);
                    if (newProgress >= value) {
                        mission.completed = true;
                    }
                    updated = true;
                    break;
                case 'level':
                    if (level >= value) {
                        newProgress = value;
                        mission.completed = true;
                        updated = true;
                    }
                    break;
                case 'powerup':
                    const collected = this.sessionData.powerupsCollected[mission.requirement.powerupId] || 0;
                    newProgress = Math.min(newProgress + collected, value);
                    if (newProgress >= value) {
                        mission.completed = true;
                    }
                    updated = true;
                    break;
            }

            mission.progress = newProgress;
        }

        if (updated) {
            await saveDailyMissions(missions);
        }
    }

    // Check and unlock skins based on requirements
    async checkSkinUnlocks(stats) {
        const unlockedSkins = await getUnlockedSkins();

        for (const skin of SKINS) {
            // Skip if already unlocked or default unlocked
            if (skin.defaultUnlocked || unlockedSkins.includes(skin.id)) continue;

            const { type, value } = skin.unlockRequirement || {};
            let shouldUnlock = false;

            switch (type) {
                case 'score':
                    shouldUnlock = stats.bestScore >= value;
                    break;
                case 'level':
                    shouldUnlock = stats.highestLevel >= value;
                    break;
                case 'ai_kills':
                    shouldUnlock = stats.totalAIKills >= value;
                    break;
                case 'achievement':
                    const achievementsData = await getAchievements();
                    shouldUnlock = achievementsData[value]?.unlocked || false;
                    break;
            }

            if (shouldUnlock) {
                await unlockSkin(skin.id);
            }
        }
    }
}

// Singleton instance
export const gameTracker = new GameSessionTracker();
