// 🐍 Snake Planet - Game Configuration

export const GAME_CONFIG = {
    WORLD_SIZE: 4800,   // ~4x larger world (was 1200)
    WORLD_HALF: 2400,

    // Snake
    SNAKE_SPEED: 3.2,  // Hızlandırıldı (was 2.85)
    SNAKE_HEAD_SIZE: 20,
    SNAKE_SEGMENT_SIZE: 14,
    SNAKE_INITIAL_LENGTH: 5,
    SEGMENT_GAP: 4,

    // AI Snakes - Smarter & Longer-lived
    AI_SNAKE_COUNT: 6,        // Bumped for larger world (was 4)
    AI_SNAKE_SPEED: 2.2,          // Biraz daha yavaşlatıldı (was 2.35)
    AI_SNAKE_INITIAL_LENGTH: 5,    // Same as player SNAKE_INITIAL_LENGTH
    AI_TURN_CHANCE: 0.015,         // Less random turning (was 0.03)
    AI_HUNT_RADIUS: 180,           // Larger hunt radius (was 120)
    AI_FLEE_RADIUS: 120,           // Larger flee radius (was 80)
    AI_OBSTACLE_AVOID_RADIUS: 60,  // Distance to detect obstacles
    AI_WALL_AVOID_RADIUS: 100,     // Distance to avoid world edges

    // Collision – tam temas: ölüm sadece gerçek temas halinde
    FOOD_COLLISION_RADIUS: 22,
    OBSTACLE_COLLISION_RADIUS: 10,   // Tam temas (was 16)
    SELF_COLLISION_RADIUS: 6,
    AI_COLLISION_RADIUS: 10,         // Tam temas – head/body (was 14)
    CONTACT_RADIUS: 10,              // Ölüm için tam temas mesafesi (head vs body, tail)

    FRAME_RATE: 60,
};

// ============== SNAKE SKINS (18 - Zone ile Eşleşen) ==============
export const SKINS = [
    // Unlocked by default (First 3)
    { id: 'forest', name: 'Orman Yılanı', headColor: '#4d8534', bodyHue: 95, bodySaturation: 55, bodyLightness: 42, eyeColor: '#ffffdd', tongueColor: '#cc2a2a', icon: '🌲', defaultUnlocked: true, unlockRequirement: null },
    { id: 'desert', name: 'Çöl Yılanı', headColor: '#d4a456', bodyHue: 38, bodySaturation: 65, bodyLightness: 50, eyeColor: '#000000', tongueColor: '#8b4513', icon: '🏜️', defaultUnlocked: true, unlockRequirement: null },
    { id: 'ice', name: 'Buz Yılanı', headColor: '#4fc3f7', bodyHue: 200, bodySaturation: 70, bodyLightness: 55, eyeColor: '#ffffff', tongueColor: '#1565c0', icon: '❄️', defaultUnlocked: true, unlockRequirement: null },

    // Score unlocks
    { id: 'night', name: 'Gece Yılanı', headColor: '#3f51b5', bodyHue: 230, bodySaturation: 50, bodyLightness: 35, eyeColor: '#ffeb3b', tongueColor: '#9c27b0', icon: '🌙', defaultUnlocked: false, unlockRequirement: { type: 'score', value: 500 } },
    { id: 'lava', name: 'Lav Yılanı', headColor: '#d32f2f', bodyHue: 15, bodySaturation: 80, bodyLightness: 45, eyeColor: '#ffff00', tongueColor: '#ff6f00', icon: '🌋', defaultUnlocked: false, unlockRequirement: { type: 'score', value: 1000 } },
    { id: 'ocean', name: 'Okyanus Yılanı', headColor: '#0288d1', bodyHue: 195, bodySaturation: 75, bodyLightness: 45, eyeColor: '#e1f5fe', tongueColor: '#01579b', icon: '🌊', defaultUnlocked: false, unlockRequirement: { type: 'score', value: 2000 } },
    { id: 'jungle', name: 'Tropikal Yılan', headColor: '#388e3c', bodyHue: 120, bodySaturation: 60, bodyLightness: 38, eyeColor: '#fff59d', tongueColor: '#ff5722', icon: '🌴', defaultUnlocked: false, unlockRequirement: { type: 'score', value: 3500 } },
    { id: 'space', name: 'Uzay Yılanı', headColor: '#7c4dff', bodyHue: 260, bodySaturation: 65, bodyLightness: 45, eyeColor: '#e0e0e0', tongueColor: '#00e5ff', icon: '🚀', defaultUnlocked: false, unlockRequirement: { type: 'score', value: 5000 } },

    // Level unlocks
    { id: 'candy', name: 'Şeker Yılanı', headColor: '#ec407a', bodyHue: 340, bodySaturation: 70, bodyLightness: 60, eyeColor: '#ffffff', tongueColor: '#ff80ab', icon: '🍭', defaultUnlocked: false, unlockRequirement: { type: 'level', value: 5 } },
    { id: 'neon', name: 'Neon Yılanı', headColor: '#76ff03', bodyHue: 'rainbow', bodySaturation: 85, bodyLightness: 55, eyeColor: '#ffffff', tongueColor: '#e040fb', icon: '🌃', defaultUnlocked: false, unlockRequirement: { type: 'level', value: 10 } },
    { id: 'crystal', name: 'Kristal Yılanı', headColor: '#81d4fa', bodyHue: 190, bodySaturation: 60, bodyLightness: 65, eyeColor: '#ffffff', tongueColor: '#4dd0e1', icon: '💎', defaultUnlocked: false, unlockRequirement: { type: 'level', value: 15 } },

    // AI kills unlocks
    { id: 'poison', name: 'Zehir Yılanı', headColor: '#9e9d24', bodyHue: 65, bodySaturation: 70, bodyLightness: 40, eyeColor: '#ff1744', tongueColor: '#76ff03', icon: '☠️', defaultUnlocked: false, unlockRequirement: { type: 'ai_kills', value: 20 } },
    { id: 'electric', name: 'Elektrik Yılanı', headColor: '#ffc107', bodyHue: 50, bodySaturation: 90, bodyLightness: 55, eyeColor: '#fff', tongueColor: '#ff5722', icon: '⚡', defaultUnlocked: false, unlockRequirement: { type: 'ai_kills', value: 50 } },
    { id: 'shadow', name: 'Gölge Yılanı', headColor: '#37474f', bodyHue: 220, bodySaturation: 15, bodyLightness: 25, eyeColor: '#b71c1c', tongueColor: '#9c27b0', icon: '🖤', defaultUnlocked: false, unlockRequirement: { type: 'ai_kills', value: 75 } },

    // Achievement unlocks
    { id: 'sakura', name: 'Sakura Yılanı', headColor: '#f48fb1', bodyHue: 330, bodySaturation: 60, bodyLightness: 70, eyeColor: '#4a148c', tongueColor: '#880e4f', icon: '🌸', defaultUnlocked: false, unlockRequirement: { type: 'achievement', value: 'zone_explorer' } },
    { id: 'gold', name: 'Altın Yılan', headColor: '#ffc107', bodyHue: 45, bodySaturation: 90, bodyLightness: 50, eyeColor: '#ffffff', tongueColor: '#ff5722', icon: '👑', defaultUnlocked: false, unlockRequirement: { type: 'achievement', value: 'score_10000' } },
    { id: 'dragon', name: 'Ejderha Yılanı', headColor: '#c62828', bodyHue: 5, bodySaturation: 75, bodyLightness: 35, eyeColor: '#ffeb3b', tongueColor: '#ff6f00', icon: '🐉', defaultUnlocked: false, unlockRequirement: { type: 'achievement', value: 'boss_terminator' } },
    { id: 'cosmic', name: 'Kozmik Yılan', headColor: '#ea80fc', bodyHue: 290, bodySaturation: 75, bodyLightness: 60, eyeColor: '#e1f5fe', tongueColor: '#7c4dff', icon: '✨', defaultUnlocked: false, unlockRequirement: { type: 'achievement', value: 'zone_master' } },
];

// AI Snake colors
export const AI_COLORS = [
    { headColor: '#e91e63', bodyHue: 340, name: 'Pembe Bot' },
    { headColor: '#9c27b0', bodyHue: 280, name: 'Mor Bot' },
    { headColor: '#ff9800', bodyHue: 30, name: 'Turuncu Bot' },
    { headColor: '#00bcd4', bodyHue: 180, name: 'Turkuaz Bot' },
    { headColor: '#795548', bodyHue: 25, name: 'Kahve Bot' },
    { headColor: '#607d8b', bodyHue: 200, name: 'Gri Bot' },
];

// ============== MAP THEMES - 18 ZONES ==============
export const MAPS = [
    { id: 'forest', name: 'Orman', bgColor: '#2a4a2a', decorations: ['🌿', '🍃', '☘️', '🌱'], decorationOpacity: 0.25, icon: '🌲' },
    { id: 'desert', name: 'Çöl', bgColor: '#c4a35a', decorations: ['🌵', '🏜️', '☀️', '🦂'], decorationOpacity: 0.3, icon: '🏜️' },
    { id: 'snow', name: 'Kar', bgColor: '#b8d4e8', decorations: ['❄️', '🌨️', '⛄', '🧊'], decorationOpacity: 0.35, icon: '❄️' },
    { id: 'night', name: 'Gece', bgColor: '#1a1a2e', decorations: ['🌙', '⭐', '✨', '🦉'], decorationOpacity: 0.4, icon: '🌙' },
    { id: 'lava', name: 'Volkan', bgColor: '#4a1a1a', decorations: ['🌋', '🔥', '💀', '🪨'], decorationOpacity: 0.3, icon: '🌋' },
    { id: 'ocean', name: 'Okyanus', bgColor: '#1565c0', decorations: ['🐠', '🐙', '🦀', '🐚'], decorationOpacity: 0.35, icon: '🌊' },
    { id: 'jungle', name: 'Tropikal', bgColor: '#1b5e20', decorations: ['🌴', '🦜', '🐒', '🌺'], decorationOpacity: 0.3, icon: '🌴' },
    { id: 'space', name: 'Uzay', bgColor: '#0d0d1a', decorations: ['🚀', '🛸', '🌌', '💫'], decorationOpacity: 0.45, icon: '🚀' },
    { id: 'candy', name: 'Şeker Diyarı', bgColor: '#f8bbd9', decorations: ['🍭', '🍬', '🧁', '🎂'], decorationOpacity: 0.35, icon: '🍭' },
    { id: 'neon', name: 'Neon Şehir', bgColor: '#120025', decorations: ['💜', '💙', '💚', '💛'], decorationOpacity: 0.5, icon: '🌃' },
    { id: 'crystal', name: 'Kristal Mağara', bgColor: '#263238', decorations: ['💎', '🔮', '💠', '🪩'], decorationOpacity: 0.4, icon: '💎' },
    { id: 'poison', name: 'Zehir Bataklığı', bgColor: '#33691e', decorations: ['☠️', '🧪', '🐸', '🍄'], decorationOpacity: 0.35, icon: '☠️' },
    { id: 'electric', name: 'Elektrik Fabrikası', bgColor: '#424242', decorations: ['⚡', '🔌', '💡', '⚙️'], decorationOpacity: 0.4, icon: '⚡' },
    { id: 'shadow', name: 'Karanlık Orman', bgColor: '#212121', decorations: ['🖤', '🦇', '🕷️', '🌑'], decorationOpacity: 0.3, icon: '🖤' },
    { id: 'sakura', name: 'Japon Bahçesi', bgColor: '#fce4ec', decorations: ['🌸', '🏯', '🎋', '🎏'], decorationOpacity: 0.35, icon: '🌸' },
    { id: 'gold', name: 'Altın Hazine', bgColor: '#795548', decorations: ['👑', '💰', '💎', '🏆'], decorationOpacity: 0.4, icon: '👑' },
    { id: 'dragon', name: 'Ejderha Yuvası', bgColor: '#3e2723', decorations: ['🐉', '🔥', '🏰', '⚔️'], decorationOpacity: 0.35, icon: '🐉' },
    { id: 'cosmic', name: 'Kozmik Geçit', bgColor: '#1a0033', decorations: ['✨', '🌠', '🛸', '🌀'], decorationOpacity: 0.5, icon: '✨' },
];

// 18 zone için skor eşikleri (her zone ~200-300 puan)
export const ZONE_THRESHOLDS = [0, 120, 280, 480, 720, 1000, 1320, 1680, 2080, 2520, 3000, 3520, 4080, 4680, 5320, 6000, 6720, 7480];

// ============== POWER-UPS ==============
export const POWERUPS = [
    { id: 'speed', name: 'Hız', emoji: '⚡', color: '#ffc107', effect: { speedMultiplier: 1.8 }, size: 28 },
    { id: 'shield', name: 'Kalkan', emoji: '🛡️', color: '#4fc3f7', effect: { shieldActive: true }, size: 30 },
    { id: 'magnet', name: 'Mıknatıs', emoji: '🧲', color: '#e91e63', effect: { magnetRadius: 100 }, size: 28 },
    { id: 'double', name: '2x Puan', emoji: '✖️', color: '#9c27b0', effect: { scoreMultiplier: 2 }, size: 32 },
];

// ============== LEVELS (Çok Zorlaştırılmış - Uzun Oyun) ==============
export const LEVELS = [
    { level: 1, targetScore: 200, obstacles: 3, title: 'Yeni Başlayan' },
    { level: 2, targetScore: 500, obstacles: 4, title: 'Çırak Avcı' },
    { level: 3, targetScore: 900, obstacles: 5, title: 'Orman Kaşifi' },
    { level: 4, targetScore: 1400, obstacles: 6, title: 'Usta Avcı' },
    { level: 5, targetScore: 2000, obstacles: 7, title: 'Yılan Kralı' },
    { level: 6, targetScore: 2800, obstacles: 8, title: 'Orman Efendisi' },
    { level: 7, targetScore: 3800, obstacles: 9, title: 'Efsanevi Yılan' },
    { level: 8, targetScore: 5000, obstacles: 10, title: 'Doğanın Hükümdarı' },
    { level: 9, targetScore: 6500, obstacles: 11, title: 'Mitolojik Canavar' },
    { level: 10, targetScore: 8500, obstacles: 12, title: '🏆 EFSANE 🏆' },
];

export const getInfiniteLevel = (level) => ({
    level,
    targetScore: 8500 + (level - 10) * 1500,
    obstacles: 12 + Math.floor((level - 10) / 2),
    title: `⭐ EFSANE ${level - 9} ⭐`,
});

// ============== FOOD TYPES (16 – av çeşidi 2x) ==============
export const FOOD_TYPES = [
    { id: 'mouse', emoji: '🐁', name: 'Fare', points: 8, size: 22 },
    { id: 'frog', emoji: '🐸', name: 'Kurbağa', points: 12, size: 24 },
    { id: 'rabbit', emoji: '🐇', name: 'Tavşan', points: 20, size: 26 },
    { id: 'bird', emoji: '🐦', name: 'Serçe', points: 15, size: 22 },
    { id: 'lizard', emoji: '🦎', name: 'Kertenkele', points: 25, size: 24 },
    { id: 'egg', emoji: '🥚', name: 'Yumurta', points: 6, size: 18 },
    { id: 'bug', emoji: '🪲', name: 'Böcek', points: 4, size: 16 },
    { id: 'cricket', emoji: '🦗', name: 'Cırcır', points: 10, size: 20 },
    { id: 'skunk', emoji: '🦨', name: 'Kokarca', points: 12, size: 22 },
    { id: 'lamb', emoji: '🐑', name: 'Kuzu', points: 12, size: 22 },
    { id: 'chicken', emoji: '🐔', name: 'Tavuk', points: 10, size: 22 },
    { id: 'squirrel', emoji: '🐿️', name: 'Sincap', points: 10, size: 20 },
    { id: 'eagle', emoji: '🦅', name: 'Kartal', points: 22, size: 26 },
    { id: 'monkey', emoji: '🐒', name: 'Maymun', points: 18, size: 24 },
    { id: 'hamster', emoji: '🐹', name: 'Hamster', points: 10, size: 20 },
    { id: 'turtle', emoji: '🐢', name: 'Kaplumbağa', points: 8, size: 20 },
];

// CANDY (dropped when AI dies) - slither.io style - BALANCED
export const CANDY_TYPES = [
    { emoji: '🔴', points: 5, size: 14 },
    { emoji: '🟠', points: 5, size: 14 },
    { emoji: '🟡', points: 5, size: 14 },
    { emoji: '🟢', points: 5, size: 14 },
    { emoji: '🔵', points: 5, size: 14 },
    { emoji: '🟣', points: 5, size: 14 },
];

// ============== OBSTACLES ==============
export const OBSTACLE_TYPES = [
    { id: 'rock', emoji: '🪨', name: 'Kaya', size: 32 },
    { id: 'mushroom', emoji: '🍄', name: 'Mantar', size: 28 },
    { id: 'stump', emoji: '🪵', name: 'Kütük', size: 35 },
];

// ============== DIFFICULTY ==============
export const DIFFICULTY = {
    INITIAL_FOOD_COUNT: 352,  // Total av 2x (was 176)
    MAX_FOOD: 576,            // Total av 2x (was 288)
    MAX_OBSTACLES: 25,
};

// ============== COLORS ==============
export const COLORS = {
    UI_PRIMARY: '#8bc34a',
    UI_DANGER: '#ff5252',
    UI_TEXT: '#ffffff',
    UI_GOLD: '#ffd700',
    LEVEL_UP: '#4fc3f7',
    JOYSTICK_BG: 'rgba(0, 0, 0, 0.4)',
    JOYSTICK_THUMB: '#7cb342',
};

// ============== BOSS SNAKES ==============
export const BOSS_CONFIG = {
    spawnEveryNLevels: 5,        // Boss spawns every 5 levels (5, 10, 15...)
    sizeMultiplier: 2.5,           // Boss is 2.5x bigger than normal AI
    speedMultiplier: 1.1,          // Boss is 10% faster
    aggressive: true,               // Always chases player
    bonusPoints: 200,              // Extra points for killing boss
    color: '#8b0000',              // Dark red (used by BossManager)
    bodyHue: 0,                    // Red hue
};
