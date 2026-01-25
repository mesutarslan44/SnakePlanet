// 📋 Daily Missions Configuration

export const MISSION_POOL = [
    // Easy Missions (Common)
    {
        id: 'score_easy_1',
        name: 'Küçük Av',
        description: '300 puan kazan',
        icon: '🎯',
        difficulty: 'easy',
        requirement: { type: 'score', value: 300 },
        reward: 10,
    },
    {
        id: 'score_easy_2',
        name: 'Puan Avcısı',
        description: '500 puan kazan',
        icon: '🎖️',
        difficulty: 'easy',
        requirement: { type: 'score', value: 500 },
        reward: 15,
    },
    {
        id: 'ai_easy_1',
        name: 'İlk Av',
        description: '3 AI yılanı öldür',
        icon: '🎣',
        difficulty: 'easy',
        requirement: { type: 'ai_kills', value: 3 },
        reward: 12,
    },
    {
        id: 'powerup_easy_1',
        name: 'Güç Toplayıcı',
        description: '3 power-up topla',
        icon: '💎',
        difficulty: 'easy',
        requirement: { type: 'powerup_collect', value: 3 },
        reward: 10,
    },
    {
        id: 'food_easy_1',
        name: 'Yemek Zamanı',
        description: '15 yemek ye',
        icon: '🍽️',
        difficulty: 'easy',
        requirement: { type: 'food_eaten', value: 15 },
        reward: 10,
    },
    {
        id: 'survival_easy_1',
        name: 'Hayatta Kal',
        description: '2 dakika hayatta kal',
        icon: '⏱️',
        difficulty: 'easy',
        requirement: { type: 'survival_time', value: 120 },
        reward: 12,
    },

    // Medium Missions (Uncommon)
    {
        id: 'score_medium_1',
        name: 'Orta Sınıf',
        description: '1,000 puan kazan',
        icon: '🏅',
        difficulty: 'medium',
        requirement: { type: 'score', value: 1000 },
        reward: 25,
    },
    {
        id: 'score_medium_2',
        name: 'Bin Beşyüz',
        description: '1,500 puan kazan',
        icon: '🎗️',
        difficulty: 'medium',
        requirement: { type: 'score', value: 1500 },
        reward: 30,
    },
    {
        id: 'ai_medium_1',
        name: 'Avcı',
        description: '7 AI yılanı öldür',
        icon: '🏹',
        difficulty: 'medium',
        requirement: { type: 'ai_kills', value: 7 },
        reward: 25,
    },
    {
        id: 'ai_medium_2',
        name: 'Yırtıcı',
        description: '10 AI yılanı öldür',
        icon: '🦅',
        difficulty: 'medium',
        requirement: { type: 'ai_kills', value: 10 },
        reward: 30,
    },
    {
        id: 'level_medium_1',
        name: 'Beşinci Seviye',
        description: 'Level 5\'e ulaş',
        icon: '⬆️',
        difficulty: 'medium',
        requirement: { type: 'level', value: 5 },
        reward: 25,
    },
    {
        id: 'level_medium_2',
        name: 'Yedinci Seviye',
        description: 'Level 7\'ye ulaş',
        icon: '📈',
        difficulty: 'medium',
        requirement: { type: 'level', value: 7 },
        reward: 30,
    },
    {
        id: 'survival_medium_1',
        name: 'Dayanıklı',
        description: '4 dakika hayatta kal',
        icon: '⌛',
        difficulty: 'medium',
        requirement: { type: 'survival_time', value: 240 },
        reward: 25,
    },
    {
        id: 'zone_medium_1',
        name: 'Gezgin',
        description: '3 farklı bölgeye gir',
        icon: '🗺️',
        difficulty: 'medium',
        requirement: { type: 'zones_visited', value: 3 },
        reward: 25,
    },

    // Hard Missions (Rare)
    {
        id: 'score_hard_1',
        name: 'Büyük Oyun',
        description: '2,500 puan kazan',
        icon: '💎',
        difficulty: 'hard',
        requirement: { type: 'score', value: 2500 },
        reward: 50,
    },
    {
        id: 'score_hard_2',
        name: 'Beş Bin Kulübü',
        description: '5,000 puan kazan',
        icon: '👑',
        difficulty: 'hard',
        requirement: { type: 'score', value: 5000 },
        reward: 75,
    },
    {
        id: 'ai_hard_1',
        name: 'Katil',
        description: '15 AI yılanı öldür',
        icon: '💀',
        difficulty: 'hard',
        requirement: { type: 'ai_kills', value: 15 },
        reward: 50,
    },
    {
        id: 'level_hard_1',
        name: 'Çift Haneli',
        description: 'Level 10\'a ulaş',
        icon: '🔟',
        difficulty: 'hard',
        requirement: { type: 'level', value: 10 },
        reward: 50,
    },
    {
        id: 'level_hard_2',
        name: 'On Beşinci Kattan',
        description: 'Level 15\'e ulaş',
        icon: '⭐',
        difficulty: 'hard',
        requirement: { type: 'level', value: 15 },
        reward: 75,
    },
    {
        id: 'survival_hard_1',
        name: 'Maraton',
        description: '6 dakika hayatta kal',
        icon: '🏃',
        difficulty: 'hard',
        requirement: { type: 'survival_time', value: 360 },
        reward: 50,
    },
    {
        id: 'boss_hard_1',
        name: 'Boss Katili',
        description: 'Bir boss yılanı öldür',
        icon: '⚔️',
        difficulty: 'hard',
        requirement: { type: 'boss_kills', value: 1 },
        reward: 60,
    },
    {
        id: 'combo_hard_1',
        name: 'Kombo!',
        description: '3 AI yılanı arka arkaya öldür',
        icon: '🔥',
        difficulty: 'hard',
        requirement: { type: 'combo_kills', value: 3 },
        reward: 55,
    },
    {
        id: 'zone_hard_1',
        name: 'Dünya Gezgini',
        description: '5 farklı bölgeye gir',
        icon: '🌍',
        difficulty: 'hard',
        requirement: { type: 'zones_visited', value: 5 },
        reward: 50,
    },
];

// Mission difficulty weights for random selection
export const MISSION_DIFFICULTY_WEIGHTS = {
    easy: 0.5,    // 50% chance
    medium: 0.35, // 35% chance
    hard: 0.15,   // 15% chance
};

// Generate 3 random daily missions
export const generateDailyMissions = () => {
    const missions = [];
    const usedIds = new Set();

    // Ensure we get 1 easy, 1 medium, 1 hard (or close to it)
    const difficultyOrder = ['easy', 'medium', 'hard'];

    for (const difficulty of difficultyOrder) {
        const pool = MISSION_POOL.filter(m => m.difficulty === difficulty && !usedIds.has(m.id));
        if (pool.length > 0) {
            const random = pool[Math.floor(Math.random() * pool.length)];
            missions.push({
                ...random,
                progress: 0,
                completed: false,
                completedAt: null,
            });
            usedIds.add(random.id);
        }
    }

    return missions;
};

// Check if missions need reset (every 24 hours at midnight)
export const shouldResetMissions = (lastResetTimestamp) => {
    const now = Date.now();
    const lastReset = new Date(lastResetTimestamp);
    const today = new Date();

    // Reset at midnight
    today.setHours(0, 0, 0, 0);

    return lastResetTimestamp === 0 || lastReset < today;
};

// Get time until next reset
export const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes, totalSeconds: Math.floor(diff / 1000) };
};
