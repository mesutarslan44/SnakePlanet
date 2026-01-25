import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const KEYS = {
    HIGH_SCORE: '@snake_planet_high_score',
    SETTINGS: '@snake_planet_settings',
    STATS: '@snake_planet_stats',
    ACHIEVEMENTS: '@snake_planet_achievements',
    DAILY_MISSIONS: '@snake_planet_daily_missions',
    UNLOCKED_SKINS: '@snake_planet_unlocked_skins',
    TUTORIAL_COMPLETED: '@snake_planet_tutorial_completed',
    LEADERBOARD: '@snake_planet_leaderboard',
    LAST_MISSION_RESET: '@snake_planet_last_mission_reset',
};

// ============== STATISTICS ==============
export const getStats = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.STATS);
        if (data) {
            return JSON.parse(data);
        }
        return {
            totalGames: 0,
            totalScore: 0,
            bestScore: 0,
            totalAIKills: 0,
            longestSnake: 0,
            highestLevel: 0,
            totalPlaytime: 0, // seconds
        };
    } catch (error) {
        console.log('Get stats error:', error);
        return null;
    }
};

export const updateStats = async (gameData) => {
    try {
        const currentStats = await getStats();
        const newStats = {
            totalGames: currentStats.totalGames + 1,
            totalScore: currentStats.totalScore + gameData.score,
            bestScore: Math.max(currentStats.bestScore, gameData.score),
            totalAIKills: currentStats.totalAIKills + (gameData.aiKills || 0),
            longestSnake: Math.max(currentStats.longestSnake, gameData.snakeLength || 0),
            highestLevel: Math.max(currentStats.highestLevel, gameData.level || 0),
            totalPlaytime: currentStats.totalPlaytime + (gameData.playtime || 0),
        };
        await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(newStats));
        return newStats;
    } catch (error) {
        console.log('Update stats error:', error);
        return null;
    }
};

export const resetStats = async () => {
    try {
        await AsyncStorage.removeItem(KEYS.STATS);
    } catch (error) {
        console.log('Reset stats error:', error);
    }
};

export const saveStats = async (stats) => {
    try {
        await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
        console.log('Save stats error:', error);
    }
};

// ============== ACHIEVEMENTS ==============
export const getAchievements = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.ACHIEVEMENTS);
        if (data) {
            return JSON.parse(data);
        }
        return {}; // { achievementId: { unlocked: true, unlockedAt: timestamp, progress: 5 } }
    } catch (error) {
        console.log('Get achievements error:', error);
        return {};
    }
};

export const updateAchievementProgress = async (achievementId, progress, unlocked = false) => {
    try {
        const achievements = await getAchievements();
        achievements[achievementId] = {
            progress,
            unlocked,
            unlockedAt: unlocked ? Date.now() : (achievements[achievementId]?.unlockedAt || null),
        };
        await AsyncStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
        return achievements[achievementId];
    } catch (error) {
        console.log('Update achievement error:', error);
        return null;
    }
};

export const unlockAchievement = async (achievementId) => {
    try {
        const achievements = await getAchievements();
        if (!achievements[achievementId]?.unlocked) {
            achievements[achievementId] = {
                ...achievements[achievementId],
                unlocked: true,
                unlockedAt: Date.now(),
            };
            await AsyncStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
            return true; // Newly unlocked
        }
        return false; // Already unlocked
    } catch (error) {
        console.log('Unlock achievement error:', error);
        return false;
    }
};

export const saveAchievements = async (achievements) => {
    try {
        await AsyncStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (error) {
        console.log('Save achievements error:', error);
    }
};

// ============== DAILY MISSIONS ==============
export const getDailyMissions = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.DAILY_MISSIONS);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        console.log('Get daily missions error:', error);
        return null;
    }
};

export const saveDailyMissions = async (missions) => {
    try {
        await AsyncStorage.setItem(KEYS.DAILY_MISSIONS, JSON.stringify(missions));
    } catch (error) {
        console.log('Save daily missions error:', error);
    }
};

export const updateMissionProgress = async (missionId, progress, completed = false) => {
    try {
        const missions = await getDailyMissions();
        if (missions && missions.missions) {
            const missionIndex = missions.missions.findIndex(m => m.id === missionId);
            if (missionIndex !== -1) {
                missions.missions[missionIndex].progress = progress;
                missions.missions[missionIndex].completed = completed;
                if (completed && !missions.missions[missionIndex].completedAt) {
                    missions.missions[missionIndex].completedAt = Date.now();
                }
                await saveDailyMissions(missions);
                return missions.missions[missionIndex];
            }
        }
        return null;
    } catch (error) {
        console.log('Update mission progress error:', error);
        return null;
    }
};

export const getLastMissionReset = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.LAST_MISSION_RESET);
        return data ? parseInt(data, 10) : 0;
    } catch (error) {
        console.log('Get last mission reset error:', error);
        return 0;
    }
};

export const setLastMissionReset = async (timestamp) => {
    try {
        await AsyncStorage.setItem(KEYS.LAST_MISSION_RESET, timestamp.toString());
    } catch (error) {
        console.log('Set last mission reset error:', error);
    }
};

// ============== UNLOCKED SKINS ==============
export const getUnlockedSkins = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.UNLOCKED_SKINS);
        if (data) {
            return JSON.parse(data);
        }
        // Default unlocked skins (first 3)
        return ['forest', 'desert', 'ice'];
    } catch (error) {
        console.log('Get unlocked skins error:', error);
        return ['forest', 'desert', 'ice'];
    }
};

export const unlockSkin = async (skinId) => {
    try {
        const unlockedSkins = await getUnlockedSkins();
        if (!unlockedSkins.includes(skinId)) {
            unlockedSkins.push(skinId);
            await AsyncStorage.setItem(KEYS.UNLOCKED_SKINS, JSON.stringify(unlockedSkins));
            return true;
        }
        return false;
    } catch (error) {
        console.log('Unlock skin error:', error);
        return false;
    }
};

// ============== TUTORIAL ==============
export const getTutorialCompleted = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.TUTORIAL_COMPLETED);
        return data === 'true';
    } catch (error) {
        console.log('Get tutorial completed error:', error);
        return false;
    }
};

export const setTutorialCompleted = async () => {
    try {
        await AsyncStorage.setItem(KEYS.TUTORIAL_COMPLETED, 'true');
    } catch (error) {
        console.log('Set tutorial completed error:', error);
    }
};

// ============== LEADERBOARD ==============
export const getLeaderboard = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.LEADERBOARD);
        if (data) {
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.log('Get leaderboard error:', error);
        return [];
    }
};

export const addToLeaderboard = async (gameData) => {
    try {
        const leaderboard = await getLeaderboard();
        leaderboard.push({
            score: gameData.score,
            level: gameData.level,
            aiKills: gameData.aiKills || 0,
            snakeLength: gameData.snakeLength || 0,
            timestamp: Date.now(),
        });
        // Sort by score, keep top 10
        leaderboard.sort((a, b) => b.score - a.score);
        const top10 = leaderboard.slice(0, 10);
        await AsyncStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(top10));
        return top10;
    } catch (error) {
        console.log('Add to leaderboard error:', error);
        return null;
    }
};

// ============== SETTINGS ==============
export const getSettings = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.SETTINGS);
        if (data) {
            return JSON.parse(data);
        }
        return {
            soundOn: true,
            vibrationOn: true,
            musicOn: true,
            selectedSkin: 'forest',
        };
    } catch (error) {
        console.log('Get settings error:', error);
        return null;
    }
};

export const saveSettings = async (settings) => {
    try {
        await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.log('Save settings error:', error);
    }
};

// ============== HIGH SCORE (Legacy support) ==============
export const getHighScore = async () => {
    try {
        const data = await AsyncStorage.getItem(KEYS.HIGH_SCORE);
        return data ? parseInt(data, 10) : 0;
    } catch (error) {
        console.log('Get high score error:', error);
        return 0;
    }
};

export const saveHighScore = async (score) => {
    try {
        await AsyncStorage.setItem(KEYS.HIGH_SCORE, score.toString());
    } catch (error) {
        console.log('Save high score error:', error);
    }
};
