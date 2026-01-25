// 🏆 Achievements Configuration

export const ACHIEVEMENTS = [
    // Score Achievements
    {
        id: 'score_500',
        name: 'İlk Adım',
        description: '500 puan kazan',
        icon: '🎯',
        category: 'score',
        requirement: { type: 'score', value: 500 },
        reward: 10, // unlock points
    },
    {
        id: 'score_1000',
        name: 'Bin Kulüp',
        description: '1,000 puan kazan',
        icon: '🎖️',
        category: 'score',
        requirement: { type: 'score', value: 1000 },
        reward: 15,
    },
    {
        id: 'score_5000',
        name: 'Ustalaşma',
        description: '5,000 puan kazan',
        icon: '🏅',
        category: 'score',
        requirement: { type: 'score', value: 5000 },
        reward: 25,
    },
    {
        id: 'score_10000',
        name: 'On Bin Efsanesi',
        description: '10,000 puan kazan',
        icon: '💎',
        category: 'score',
        requirement: { type: 'score', value: 10000 },
        reward: 50,
    },
    {
        id: 'score_25000',
        name: 'Yılan Tanrısı',
        description: '25,000 puan kazan',
        icon: '👑',
        category: 'score',
        requirement: { type: 'score', value: 25000 },
        reward: 100,
    },

    // AI Kill Achievements
    {
        id: 'first_blood',
        name: 'İlk Kan',
        description: 'İlk AI yılanını öldür',
        icon: '🩸',
        category: 'combat',
        requirement: { type: 'ai_kills', value: 1 },
        reward: 10,
    },
    {
        id: 'hunter',
        name: 'Avcı',
        description: '10 AI yılanı öldür',
        icon: '🏹',
        category: 'combat',
        requirement: { type: 'ai_kills', value: 10 },
        reward: 20,
    },
    {
        id: 'predator',
        name: 'Yırtıcı',
        description: '50 AI yılanı öldür',
        icon: '🦅',
        category: 'combat',
        requirement: { type: 'ai_kills', value: 50 },
        reward: 40,
    },
    {
        id: 'exterminator',
        name: 'İmhacı',
        description: '100 AI yılanı öldür',
        icon: '💀',
        category: 'combat',
        requirement: { type: 'ai_kills', value: 100 },
        reward: 80,
    },

    // Level Achievements
    {
        id: 'level_5',
        name: 'Yükseliş',
        description: 'Level 5\'e ulaş',
        icon: '⬆️',
        category: 'progress',
        requirement: { type: 'level', value: 5 },
        reward: 15,
    },
    {
        id: 'level_10',
        name: 'Çift Haneli',
        description: 'Level 10\'a ulaş',
        icon: '🔟',
        category: 'progress',
        requirement: { type: 'level', value: 10 },
        reward: 30,
    },
    {
        id: 'level_20',
        name: 'Efsane Seviye',
        description: 'Level 20\'ye ulaş',
        icon: '⭐',
        category: 'progress',
        requirement: { type: 'level', value: 20 },
        reward: 60,
    },
    {
        id: 'level_50',
        name: 'Elli Elli',
        description: 'Level 50\'ye ulaş',
        icon: '🌟',
        category: 'progress',
        requirement: { type: 'level', value: 50 },
        reward: 150,
    },

    // Power-up Achievements
    {
        id: 'speed_demon',
        name: 'Hız Canavarı',
        description: '10 kez hız power-up topla',
        icon: '⚡',
        category: 'powerup',
        requirement: { type: 'powerup_speed', value: 10 },
        reward: 15,
    },
    {
        id: 'shielded',
        name: 'Korumalı',
        description: '10 kez kalkan power-up topla',
        icon: '🛡️',
        category: 'powerup',
        requirement: { type: 'powerup_shield', value: 10 },
        reward: 15,
    },
    {
        id: 'magnetic',
        name: 'Mıknatıs Usta',
        description: '10 kez mıknatıs power-up topla',
        icon: '🧲',
        category: 'powerup',
        requirement: { type: 'powerup_magnet', value: 10 },
        reward: 15,
    },
    {
        id: 'double_points',
        name: 'Çift Puan Pro',
        description: '10 kez 2x puan power-up topla',
        icon: '✖️',
        category: 'powerup',
        requirement: { type: 'powerup_double', value: 10 },
        reward: 15,
    },

    // Zone Achievements
    {
        id: 'zone_explorer',
        name: 'Keşifçi',
        description: '5 farklı bölgeye gir',
        icon: '🗺️',
        category: 'exploration',
        requirement: { type: 'zones_visited', value: 5 },
        reward: 20,
    },
    {
        id: 'world_traveler',
        name: 'Dünya Gezgini',
        description: '10 farklı bölgeye gir',
        icon: '🌍',
        category: 'exploration',
        requirement: { type: 'zones_visited', value: 10 },
        reward: 40,
    },
    {
        id: 'zone_master',
        name: 'Bölge Efendisi',
        description: 'Tüm 18 bölgeyi gez',
        icon: '🌎',
        category: 'exploration',
        requirement: { type: 'zones_visited', value: 18 },
        reward: 100,
    },

    // Snake Length
    {
        id: 'long_snake',
        name: 'Uzun Yılan',
        description: '20 segment uzunluğa ulaş',
        icon: '📏',
        category: 'growth',
        requirement: { type: 'snake_length', value: 20 },
        reward: 20,
    },
    {
        id: 'giant_snake',
        name: 'Dev Yılan',
        description: '50 segment uzunluğa ulaş',
        icon: '🐍',
        category: 'growth',
        requirement: { type: 'snake_length', value: 50 },
        reward: 50,
    },

    // Survival
    {
        id: 'survivor',
        name: 'Hayatta Kalan',
        description: 'Bir oyunda 5 dakika hayatta kal',
        icon: '⏱️',
        category: 'survival',
        requirement: { type: 'survival_time', value: 300 }, // 300 seconds
        reward: 25,
    },
    {
        id: 'endurance',
        name: 'Dayanıklılık',
        description: 'Bir oyunda 10 dakika hayatta kal',
        icon: '⌛',
        category: 'survival',
        requirement: { type: 'survival_time', value: 600 },
        reward: 50,
    },

    // Boss Achievements
    {
        id: 'boss_slayer',
        name: 'Boss Avcısı',
        description: 'İlk boss yılanını öldür',
        icon: '🗡️',
        category: 'boss',
        requirement: { type: 'boss_kills', value: 1 },
        reward: 30,
    },
    {
        id: 'boss_terminator',
        name: 'Boss Katili',
        description: '5 boss yılanı öldür',
        icon: '⚔️',
        category: 'boss',
        requirement: { type: 'boss_kills', value: 5 },
        reward: 75,
    },

    // Special
    {
        id: 'combo_master',
        name: 'Kombo Ustası',
        description: '5 AI yılanı arka arkaya öldür (30 sn içinde)',
        icon: '🔥',
        category: 'special',
        requirement: { type: 'combo_kills', value: 5 },
        reward: 40,
    },
    {
        id: 'perfectionist',
        name: 'Mükemmeliyetçi',
        description: 'Hiç hasar almadan level 5\'e ulaş',
        icon: '✨',
        category: 'special',
        requirement: { type: 'perfect_run', value: 5 },
        reward: 60,
    },
    {
        id: 'skin_collector',
        name: 'Koleksiyoncu',
        description: 'Tüm skinleri aç',
        icon: '🎨',
        category: 'collection',
        requirement: { type: 'skins_unlocked', value: 18 },
        reward: 200,
    },
];

// Achievement Categories for UI
export const ACHIEVEMENT_CATEGORIES = [
    { id: 'all', name: 'Tümü', icon: '🏆' },
    { id: 'score', name: 'Skor', icon: '🎯' },
    { id: 'combat', name: 'Savaş', icon: '⚔️' },
    { id: 'progress', name: 'İlerleme', icon: '📊' },
    { id: 'powerup', name: 'Power-Up', icon: '💎' },
    { id: 'exploration', name: 'Keşif', icon: '🗺️' },
    { id: 'growth', name: 'Büyüme', icon: '📏' },
    { id: 'survival', name: 'Hayatta Kalma', icon: '⏱️' },
    { id: 'boss', name: 'Boss', icon: '👹' },
    { id: 'special', name: 'Özel', icon: '⭐' },
    { id: 'collection', name: 'Koleksiyon', icon: '🎨' },
];

// Helper function to check if achievement is unlocked
export const checkAchievementUnlock = (achievement, gameData, stats, unlockedAchievements) => {
    const { requirement } = achievement;

    switch (requirement.type) {
        case 'score':
            return gameData.score >= requirement.value;
        case 'ai_kills':
            return stats.totalAIKills >= requirement.value;
        case 'level':
            return stats.highestLevel >= requirement.value;
        case 'powerup_speed':
        case 'powerup_shield':
        case 'powerup_magnet':
        case 'powerup_double':
            return (stats[requirement.type] || 0) >= requirement.value;
        case 'zones_visited':
            return (stats.zonesVisited?.size || 0) >= requirement.value;
        case 'snake_length':
            return stats.longestSnake >= requirement.value;
        case 'survival_time':
            return gameData.playtime >= requirement.value;
        case 'boss_kills':
            return (stats.bossKills || 0) >= requirement.value;
        case 'combo_kills':
            return (gameData.comboKills || 0) >= requirement.value;
        case 'perfect_run':
            return gameData.perfectRun && gameData.level >= requirement.value;
        case 'skins_unlocked':
            return stats.unlockedSkinsCount >= requirement.value;
        default:
            return false;
    }
};
