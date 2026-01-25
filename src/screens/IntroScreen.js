import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ onFinish }) => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslate = useRef(new Animated.Value(30)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const glowOpacity = useRef(new Animated.Value(0)).current;
    const particlesOpacity = useRef(new Animated.Value(0)).current;
    const fadeOut = useRef(new Animated.Value(1)).current;

    const [particles] = useState(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            size: 4 + Math.random() * 8,
            delay: Math.random() * 1000,
            duration: 2000 + Math.random() * 2000,
        }))
    );

    const particleAnims = useRef(particles.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Main animation sequence
        Animated.sequence([
            // Logo zoom in with rotation
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(logoRotate, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.out(Easing.back(1.5)),
                    useNativeDriver: true,
                }),
                Animated.timing(glowOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            // Title fade in
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(titleTranslate, {
                    toValue: 0,
                    tension: 80,
                    friction: 10,
                    useNativeDriver: true,
                }),
            ]),
            // Subtitle fade in
            Animated.timing(subtitleOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            // Particles
            Animated.timing(particlesOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            // Wait
            Animated.delay(800),
            // Fade out
            Animated.timing(fadeOut, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onFinish && onFinish();
        });

        // Particle float animations
        particleAnims.forEach((anim, i) => {
            const particle = particles[i];
            setTimeout(() => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(anim, {
                            toValue: 1,
                            duration: particle.duration,
                            easing: Easing.inOut(Easing.sin),
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim, {
                            toValue: 0,
                            duration: particle.duration,
                            easing: Easing.inOut(Easing.sin),
                            useNativeDriver: true,
                        }),
                    ])
                ).start();
            }, particle.delay);
        });
    }, []);

    const logoRotation = logoRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['-180deg', '0deg'],
    });

    const glowScale = glowOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1.2],
    });

    return (
        <Animated.View style={[styles.container, { opacity: fadeOut }]}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#0d1a12', '#1a3320', '#0d1a12']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Floating particles */}
                <Animated.View style={[styles.particlesContainer, { opacity: particlesOpacity }]}>
                    {particles.map((p, i) => (
                        <Animated.View
                            key={p.id}
                            style={[
                                styles.particle,
                                {
                                    left: p.x,
                                    top: p.y,
                                    width: p.size,
                                    height: p.size,
                                    borderRadius: p.size / 2,
                                    transform: [{
                                        translateY: particleAnims[i].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -30],
                                        }),
                                    }],
                                    opacity: particleAnims[i].interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [0.3, 1, 0.3],
                                    }),
                                },
                            ]}
                        />
                    ))}
                </Animated.View>

                {/* Glow effect behind logo */}
                <Animated.View
                    style={[
                        styles.glow,
                        {
                            opacity: glowOpacity,
                            transform: [{ scale: glowScale }],
                        }
                    ]}
                />

                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            transform: [
                                { scale: logoScale },
                                { rotate: logoRotation },
                            ]
                        }
                    ]}
                >
                    <View style={styles.snakeCoil}>
                        <Text style={styles.snakeEmoji}>🐍</Text>
                    </View>
                    <View style={styles.planetRing} />
                </Animated.View>

                {/* Title */}
                <Animated.View
                    style={[
                        styles.titleContainer,
                        {
                            opacity: titleOpacity,
                            transform: [{ translateY: titleTranslate }],
                        }
                    ]}
                >
                    <Text style={styles.title}>YILAN</Text>
                    <Text style={styles.titlePlanet}>GEZEGENİ</Text>
                </Animated.View>

                {/* Subtitle */}
                <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
                    🌍 18 Bölge • 🐍 18 Skin • ∞ Level
                </Animated.Text>

                {/* Loading dots */}
                <Animated.View style={[styles.loadingContainer, { opacity: subtitleOpacity }]}>
                    <View style={[styles.loadingDot, styles.dot1]} />
                    <View style={[styles.loadingDot, styles.dot2]} />
                    <View style={[styles.loadingDot, styles.dot3]} />
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    particlesContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    particle: {
        position: 'absolute',
        backgroundColor: '#8bc34a',
    },
    glow: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#8bc34a',
        opacity: 0.15,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    snakeCoil: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(139, 195, 74, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#8bc34a',
        shadowColor: '#8bc34a',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 15,
    },
    snakeEmoji: {
        fontSize: 60,
    },
    planetRing: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: 'rgba(139, 195, 74, 0.3)',
        borderStyle: 'dashed',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    titlePlanet: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffc107',
        letterSpacing: 12,
        marginTop: -5,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: 20,
    },
    loadingContainer: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 8,
    },
    loadingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#8bc34a',
    },
    dot1: { opacity: 0.4 },
    dot2: { opacity: 0.6 },
    dot3: { opacity: 1 },
});

export default IntroScreen;
