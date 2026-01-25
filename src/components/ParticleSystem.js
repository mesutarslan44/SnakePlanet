import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

/**
 * ParticleSystem - Manages animated particles for game events
 * Usage: Call spawn methods to create particle effects
 */

const ParticleSystem = () => {
    const [particles, setParticles] = useState([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        startAnimationLoop();
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const startAnimationLoop = () => {
        const loop = () => {
            setParticles(prevParticles => {
                const updatedParticles = prevParticles
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.3, // Gravity
                        life: p.life - 1,
                        opacity: Math.max(0, p.life / p.maxLife),
                    }))
                    .filter(p => p.life > 0);

                return updatedParticles;
            });

            animationFrameRef.current = requestAnimationFrame(loop);
        };

        animationFrameRef.current = requestAnimationFrame(loop);
    };

    const addParticles = (newParticles) => {
        setParticles(prev => {
            // Limit max particles for performance
            const combined = [...prev, ...newParticles];
            return combined.length > 50 ? combined.slice(-50) : combined;
        });
    };

    const spawnFoodParticles = (emoji, x, y) => {
        const newParticles = [];
        const count = 6;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2 + Math.random() * 2;

            newParticles.push({
                id: `food_${Date.now()}_${i}`,
                emoji,
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                life: 30,
                maxLife: 30,
                opacity: 1,
                size: 16,
            });
        }

        addParticles(newParticles);
    };

    const spawnPowerupParticles = (x, y) => {
        const newParticles = [];
        const emojis = ['✨', '💫', '⭐'];
        const count = 12;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 3 + Math.random() * 3;

            newParticles.push({
                id: `power_${Date.now()}_${i}`,
                emoji: emojis[i % emojis.length],
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                life: 40,
                maxLife: 40,
                opacity: 1,
                size: 14,
            });
        }

        addParticles(newParticles);
    };

    const spawnExplosion = (x, y) => {
        const newParticles = [];
        const emojis = ['💥', '💢', '⚡'];
        const count = 15;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;

            newParticles.push({
                id: `explosion_${Date.now()}_${i}`,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                life: 35,
                maxLife: 35,
                opacity: 1,
                size: 18,
            });
        }

        addParticles(newParticles);
    };

    const spawnConfetti = (x, y) => {
        const newParticles = [];
        const emojis = ['🎉', '🎊', '✨', '🌟', '💫'];
        const count = 20;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI / 6) + (Math.random() * Math.PI * 2 / 3); // Upward cone
            const speed = 4 + Math.random() * 4;

            newParticles.push({
                id: `confetti_${Date.now()}_${i}`,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                x,
                y,
                vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
                vy: Math.sin(angle) * -speed,
                life: 50,
                maxLife: 50,
                opacity: 1,
                size: 20,
            });
        }

        addParticles(newParticles);
    };

    // Expose methods via ref
    React.useImperativeHandle(ParticleSystem.ref, () => ({
        spawnFoodParticles,
        spawnPowerupParticles,
        spawnExplosion,
        spawnConfetti,
    }));

    return (
        <View style={styles.container} pointerEvents="none">
            {particles.map(particle => (
                <Text
                    key={particle.id}
                    style={[
                        styles.particle,
                        {
                            left: particle.x,
                            top: particle.y,
                            opacity: particle.opacity,
                            fontSize: particle.size,
                        },
                    ]}
                >
                    {particle.emoji}
                </Text>
            ))}
        </View>
    );
};

// Static ref for accessing methods
ParticleSystem.ref = React.createRef();

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    particle: {
        position: 'absolute',
    },
});

export default ParticleSystem;
