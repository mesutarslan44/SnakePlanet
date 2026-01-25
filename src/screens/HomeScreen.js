import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SoundEffects } from '../utils/SoundManager';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ onStartGame, onOpenSettings, onOpenStats, onOpenAchievements, stats }) => {
    const titleAnim = useRef(new Animated.Value(0)).current;
    const snakeAnim = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entry animations
        Animated.stagger(150, [
            Animated.spring(titleAnim, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 }),
            Animated.spring(snakeAnim, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 }),
            Animated.spring(buttonAnim, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 }),
        ]).start();

        // Pulse animation for play button
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.08, duration: 1000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            ])
        ).start();

        // Glow animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const titleScale = titleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
    const snakeTranslate = snakeAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] });
    const buttonTranslate = buttonAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] });
    const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] });

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                {/* Animated background particles */}
                <View style={styles.particles}>
                    {[...Array(12)].map((_, i) => (
                        <Animated.Text
                            key={i}
                            style={[
                                styles.particle,
                                {
                                    left: `${8 + (i * 8)}%`,
                                    top: 60 + (i % 4) * 150,
                                    opacity: glowOpacity,
                                    transform: [{ scale: 0.8 + (i % 3) * 0.3 }]
                                }
                            ]}
                        >
                            {['🌿', '🍃', '☘️', '✨'][i % 4]}
                        </Animated.Text>
                    ))}
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Logo & Title */}
                    <Animated.View style={[styles.titleSection, { opacity: titleAnim, transform: [{ scale: titleScale }] }]}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoEmoji}>🐍</Text>
                            <Animated.View style={[styles.logoGlow, { opacity: glowOpacity }]} />
                        </View>
                        <Text style={styles.title}>SLITHER</Text>
                        <Text style={styles.subtitle}>PLANET</Text>
                        <View style={styles.tagline}>
                            <Text style={styles.taglineText}>🎯 Ye • 📈 Büyü • 💀 Hayatta Kal</Text>
                        </View>
                    </Animated.View>

                    {/* Animated Snake Preview */}
                    <Animated.View style={[styles.snakePreview, { opacity: snakeAnim, transform: [{ translateY: snakeTranslate }] }]}>
                        <View style={styles.previewSnake}>
                            {[...Array(10)].map((_, i) => (
                                <Animated.View
                                    key={i}
                                    style={[
                                        styles.previewSegment,
                                        {
                                            width: 24 - i * 1.2,
                                            height: 24 - i * 1.2,
                                            backgroundColor: `hsl(95, ${60 + i * 2}%, ${45 - i * 2}%)`,
                                            marginLeft: i === 0 ? 0 : -10,
                                            zIndex: 10 - i,
                                        }
                                    ]}
                                >
                                    {i === 0 && (
                                        <View style={styles.previewEyes}>
                                            <View style={styles.previewEye} />
                                            <View style={styles.previewEye} />
                                        </View>
                                    )}
                                </Animated.View>
                            ))}
                        </View>
                    </Animated.View>

                    {/* High Score Card */}
                    {stats?.bestScore > 0 && (
                        <View style={styles.highScoreCard}>
                            <LinearGradient
                                colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.05)']}
                                style={styles.highScoreGradient}
                            >
                                <Text style={styles.highScoreTrophy}>🏆</Text>
                                <View style={styles.highScoreInfo}>
                                    <Text style={styles.highScoreLabel}>EN YÜKSEK SKOR</Text>
                                    <Text style={styles.highScoreValue}>{stats.bestScore.toLocaleString()}</Text>
                                </View>
                                <View style={styles.highScoreBadge}>
                                    <Text style={styles.highScoreBadgeText}>Lv.{stats.highestLevel || 1}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    )}

                    {/* Quick Tips - Compact & Professional */}
                    <View style={styles.tipsCard}>
                        <View style={styles.tipsHeader}>
                            <Text style={styles.tipsIcon}>💡</Text>
                            <Text style={styles.tipsTitle}>HIZLI İPUÇLARI</Text>
                        </View>
                        <View style={styles.tipsGrid}>
                            <View style={styles.tipItem}>
                                <Text style={styles.tipEmoji}>🎮</Text>
                                <Text style={styles.tipText}>Joystick ile yönlendir</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Text style={styles.tipEmoji}>🐁</Text>
                                <Text style={styles.tipText}>Hayvanları avla</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Text style={styles.tipEmoji}>🤖</Text>
                                <Text style={styles.tipText}>AI yılanlarını öldür</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Text style={styles.tipEmoji}>🍬</Text>
                                <Text style={styles.tipText}>Şekerleri topla</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Text style={styles.tipEmoji}>⚠️</Text>
                                <Text style={styles.tipText}>Engellerden kaç</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Text style={styles.tipEmoji}>🌍</Text>
                                <Text style={styles.tipText}>18 farklı bölge</Text>
                            </View>
                        </View>
                    </View>

                    {/* Play Button - Premium Design */}
                    <Animated.View style={[styles.buttonSection, { opacity: buttonAnim, transform: [{ translateY: buttonTranslate }] }]}>
                        <TouchableOpacity
                            style={styles.playButtonWrapper}
                            onPress={() => { SoundEffects.select(); onStartGame(); }}
                            activeOpacity={0.85}
                        >
                            <Animated.View style={[styles.playButtonGlowOuter, { opacity: glowOpacity }]} />
                            <Animated.View style={[styles.playButton, { transform: [{ scale: pulseAnim }] }]}>
                                <LinearGradient
                                    colors={['#9ccc65', '#7cb342', '#558b2f']}
                                    style={styles.playButtonGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={styles.playButtonIcon}>🎮</Text>
                                    <Text style={styles.playButtonText}>OYNA</Text>
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Menu Buttons - Clean 2-Button Layout */}
                    <View style={styles.menuRow}>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => { SoundEffects.select(); onOpenStats && onOpenStats(); }}
                        >
                            <LinearGradient colors={['rgba(79, 195, 247, 0.2)', 'rgba(79, 195, 247, 0.05)']} style={styles.menuButtonGradient}>
                                <Text style={styles.menuButtonIcon}>📊</Text>
                                <Text style={styles.menuButtonText}>İstatistikler</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => { SoundEffects.select(); onOpenAchievements && onOpenAchievements(); }}
                        >
                            <LinearGradient colors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 215, 0, 0.05)']} style={styles.menuButtonGradient}>
                                <Text style={styles.menuButtonIcon}>🏆</Text>
                                <Text style={styles.menuButtonText}>Başarımlar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Settings Button */}
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => { SoundEffects.select(); onOpenSettings && onOpenSettings(); }}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.settingsButtonText}>⚙️ Ayarlar</Text>
                    </TouchableOpacity>

                    {/* Footer */}
                    <Text style={styles.footer}>Slither Planet v1.0</Text>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1 },
    particles: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 },
    particle: { position: 'absolute', fontSize: 28 },
    scrollContent: { alignItems: 'center', paddingTop: 50, paddingBottom: 30, zIndex: 1 },

    // Title Section
    titleSection: { alignItems: 'center', marginBottom: 5 },
    logoContainer: { position: 'relative', marginBottom: 8 },
    logoEmoji: { fontSize: 80, textShadowColor: 'rgba(139, 195, 74, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
    logoGlow: { position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, borderRadius: 50, backgroundColor: 'rgba(139, 195, 74, 0.3)' },
    title: { fontSize: 48, fontWeight: '900', color: '#8bc34a', letterSpacing: 6, textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 8 },
    subtitle: { fontSize: 26, fontWeight: '300', color: '#fff', letterSpacing: 16, marginTop: -8, opacity: 0.9 },
    tagline: { marginTop: 12, backgroundColor: 'rgba(139, 195, 74, 0.15)', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(139, 195, 74, 0.3)' },
    taglineText: { fontSize: 13, color: '#8bc34a', fontWeight: '600', letterSpacing: 1 },

    // Snake Preview
    snakePreview: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
    previewSnake: { flexDirection: 'row', alignItems: 'center' },
    previewSegment: { borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(0,0,0,0.3)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
    previewEyes: { flexDirection: 'row', gap: 5 },
    previewEye: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#ffffdd' },

    // High Score
    highScoreCard: { width: width * 0.85, marginBottom: 16, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
    highScoreGradient: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 },
    highScoreTrophy: { fontSize: 32, marginRight: 12 },
    highScoreInfo: { flex: 1 },
    highScoreLabel: { fontSize: 10, color: 'rgba(255, 215, 0, 0.8)', fontWeight: '600', letterSpacing: 1 },
    highScoreValue: { fontSize: 28, color: '#ffd700', fontWeight: 'bold' },
    highScoreBadge: { backgroundColor: 'rgba(255, 215, 0, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    highScoreBadgeText: { fontSize: 12, color: '#ffd700', fontWeight: 'bold' },

    // Tips Card
    tipsCard: { width: width * 0.9, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    tipsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
    tipsIcon: { fontSize: 18, marginRight: 8 },
    tipsTitle: { fontSize: 14, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
    tipsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    tipItem: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12, marginBottom: 8 },
    tipEmoji: { fontSize: 20, marginRight: 10 },
    tipText: { fontSize: 12, color: 'rgba(255,255,255,0.8)', flex: 1 },

    // Play Button
    buttonSection: { marginBottom: 20, alignItems: 'center' },
    playButtonWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
    playButtonGlowOuter: { position: 'absolute', width: 200, height: 70, borderRadius: 35, backgroundColor: 'rgba(139, 195, 74, 0.3)' },
    playButton: { borderRadius: 35, overflow: 'hidden', elevation: 12, shadowColor: '#8bc34a', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 12 },
    playButtonGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 50, paddingVertical: 18 },
    playButtonIcon: { fontSize: 28, marginRight: 10 },
    playButtonText: { fontSize: 26, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },

    // Menu Buttons
    menuRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 16, width: width * 0.85 },
    menuButton: { flex: 1, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    menuButtonGradient: { alignItems: 'center', paddingVertical: 16 },
    menuButtonIcon: { fontSize: 32, marginBottom: 6 },
    menuButtonText: { fontSize: 13, color: '#fff', fontWeight: '600' },

    // Settings
    settingsButton: { paddingVertical: 12, paddingHorizontal: 30, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
    settingsButtonText: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },

    // Footer
    footer: { fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 20 },
});

export default HomeScreen;
