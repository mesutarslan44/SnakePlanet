import { BOSS_CONFIG, AI_COLORS, GAME_CONFIG } from '../constants/GameConfig';

/**
 * Boss Snake Manager
 * Handles boss snake creation, behavior, and rewards
 */

export const shouldSpawnBoss = (level) => {
    return level % BOSS_CONFIG.spawnEveryNLevels === 0 && level > 0;
};

export const createBossSnake = (level) => {
    const bossLevel = Math.floor(level / BOSS_CONFIG.spawnEveryNLevels);

    // Boss gets stronger with each appearance
    const sizeMultiplier = BOSS_CONFIG.sizeMultiplier + (bossLevel - 1) * 0.3;
    const speedMultiplier = BOSS_CONFIG.speedMultiplier + (bossLevel - 1) * 0.1;

    // Spawn BOSS further away for dramatic entrance
    const angle = Math.random() * Math.PI * 2;
    const distance = 500 + Math.random() * 200;
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;

    const dir = Math.random() * Math.PI * 2;
    // MUCH LONGER BOSS: Base 30 segments, +5 per boss level (was: AI_SNAKE_INITIAL_LENGTH * sizeMultiplier ~12)
    const initialLength = 30 + (bossLevel * 5);
    
    // Create position history for proper segment spacing (like normal AI)
    const segmentGap = GAME_CONFIG.SEGMENT_GAP;
    const positionHistory = [];
    for (let i = 0; i < 500; i++) {
        positionHistory.push({
            x: startX - Math.cos(dir) * i * 2,
            y: startY - Math.sin(dir) * i * 2
        });
    }

    // Create segments from history (same logic as normal AI)
    const segments = [];
    for (let i = 0; i < initialLength; i++) {
        const histIdx = i * Math.max(2, segmentGap);
        if (histIdx < positionHistory.length) {
            segments.push({ ...positionHistory[histIdx] });
        }
    }

    return {
        id: `boss_${level}_${Date.now()}`,
        isBoss: true,
        bossLevel,
        name: `👑 BOSS ${bossLevel}`,
        headColor: BOSS_CONFIG.color,
        bodyHue: BOSS_CONFIG.bodyHue,
        worldX: startX,
        worldY: startY,
        direction: { x: Math.cos(dir), y: Math.sin(dir) },
        segments,
        positionHistory, // Store history for segment spacing
        length: initialLength,
        alive: true,
        score: 0,
        sizeMultiplier,
        speedMultiplier,
        aggressive: true,
    };
};

export const getBossReward = (boss) => {
    return BOSS_CONFIG.bonusPoints * boss.bossLevel;
};

/**
 * Boss AI behavior - VERY SMART: aggressive but avoids self-collision
 */
export const updateBossAI = (boss, playerX, playerY, playerLength, obstacles) => {
    if (!boss.alive || !boss.isBoss) return;

    // === PRIORITY 1: SELF-COLLISION AVOIDANCE (CRITICAL!) ===
    // Boss must avoid its own tail - this is why they were dying too easily!
    let avoidSelfDir = { x: 0, y: 0 };
    let mustAvoidSelf = false;
    const SELF_AVOID_RADIUS = 100; // Large radius to detect tail early
    
    if (boss.segments && boss.segments.length >= 4) {
        const bossHead = boss.segments[0];
        const minCheckIndex = Math.max(3, Math.floor(boss.segments.length * 0.2)); // Check from 20% of body
        
        for (let i = minCheckIndex; i < boss.segments.length; i++) {
            const seg = boss.segments[i];
            if (!seg) continue;
            
            const dx = bossHead.x - seg.x;
            const dy = bossHead.y - seg.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < SELF_AVOID_RADIUS && dist > 5) {
                const force = (SELF_AVOID_RADIUS - dist) / SELF_AVOID_RADIUS * 2.0; // Strong avoidance
                avoidSelfDir.x += (dx / dist) * force;
                avoidSelfDir.y += (dy / dist) * force;
                mustAvoidSelf = true;
            }
        }
    }

    // === PRIORITY 2: OBSTACLE AVOIDANCE ===
    let avoidDir = { x: 0, y: 0 };
    let mustAvoid = false;
    const AVOID_RADIUS = 90; // Larger for boss

    for (const obs of obstacles) {
        const dx = boss.worldX - obs.worldX;
        const dy = boss.worldY - obs.worldY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < AVOID_RADIUS) {
            const force = (AVOID_RADIUS - dist) / AVOID_RADIUS;
            avoidDir.x += (dx / dist) * force * 1.5;
            avoidDir.y += (dy / dist) * force * 1.5;
            mustAvoid = true;
        }
    }

    // === PRIORITY 3: SMART HUNTING ===
    const distToPlayer = Math.sqrt((playerX - boss.worldX) ** 2 + (playerY - boss.worldY) ** 2);
    const shouldHunt = distToPlayer < 700; // Large hunt radius
    const canEncircle = boss.length > playerLength + 10 && distToPlayer < 250 && distToPlayer > 50;

    let targetDir = { x: boss.direction.x, y: boss.direction.y };

    if (mustAvoidSelf) {
        // CRITICAL: Avoid own tail first!
        const mag = Math.sqrt(avoidSelfDir.x ** 2 + avoidSelfDir.y ** 2);
        if (mag > 0) {
            targetDir.x = avoidSelfDir.x / mag;
            targetDir.y = avoidSelfDir.y / mag;
        }
        // Fast reaction to avoid self-collision
        boss.direction.x = boss.direction.x * 0.3 + targetDir.x * 0.7;
        boss.direction.y = boss.direction.y * 0.3 + targetDir.y * 0.7;
    } else if (mustAvoid) {
        // Avoid obstacles
        const mag = Math.sqrt(avoidDir.x ** 2 + avoidDir.y ** 2);
        if (mag > 0) {
            targetDir.x = avoidDir.x / mag;
            targetDir.y = avoidDir.y / mag;
        }
        boss.direction.x = boss.direction.x * 0.4 + targetDir.x * 0.6;
        boss.direction.y = boss.direction.y * 0.4 + targetDir.y * 0.6;
    } else if (canEncircle) {
        // SMART: Try to encircle player when boss is much longer
        const dx = playerX - boss.worldX;
        const dy = playerY - boss.worldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Orbit around player (perpendicular movement)
        const orbitDir = boss.orbitDirection || (Math.random() < 0.5 ? 1 : -1);
        boss.orbitDirection = orbitDir;
        
        const perpX = -dy / dist * orbitDir;
        const perpY = dx / dist * orbitDir;
        
        // Maintain ideal distance
        const IDEAL_DISTANCE = 120;
        let radialAdjust = 0;
        if (dist < IDEAL_DISTANCE) radialAdjust = -0.3; // Push out
        else if (dist > IDEAL_DISTANCE + 40) radialAdjust = 0.2; // Pull in
        
        targetDir.x = perpX + (dx / dist) * radialAdjust;
        targetDir.y = perpY + (dy / dist) * radialAdjust;
        
        const mag = Math.sqrt(targetDir.x ** 2 + targetDir.y ** 2);
        if (mag > 0) {
            targetDir.x /= mag;
            targetDir.y /= mag;
        }
        
        boss.direction.x = boss.direction.x * 0.75 + targetDir.x * 0.25;
        boss.direction.y = boss.direction.y * 0.75 + targetDir.y * 0.25;
    } else if (shouldHunt) {
        // AGGRESSIVE HUNT - but not too aggressive (avoid self-collision)
        const dx = playerX - boss.worldX;
        const dy = playerY - boss.worldY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        targetDir = { x: dx / dist, y: dy / dist };

        // Moderate turning - not too sharp (prevents self-collision)
        boss.direction.x = boss.direction.x * 0.7 + targetDir.x * 0.3;
        boss.direction.y = boss.direction.y * 0.7 + targetDir.y * 0.3;
    }

    // Normalize
    const mag = Math.sqrt(boss.direction.x ** 2 + boss.direction.y ** 2);
    if (mag > 0) {
        boss.direction.x /= mag;
        boss.direction.y /= mag;
    }
};
