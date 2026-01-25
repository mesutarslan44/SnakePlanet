import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getStats } from '../utils/StorageManager';
import { SoundEffects } from '../utils/SoundManager';

const { width } = Dimensions.get('window');

const DEFAULT_STATS = { totalGames: 0, totalScore: 0, bestScore: 0, totalAIKills: 0, longestSnake: 0, highestLevel: 0, totalPlaytime: 0 };

const StatsScreen = ({ onBack }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const data = await getStats();
        setStats(data || DEFAULT_STATS);
    };

    const formatTime = (seconds) => {
        const s = Math.max(0, Number(seconds) || 0);
        const hours = Math.floor(s / 3600);
        const mins = Math.floor((s % 3600) / 60);
        if (hours > 0) return `${hours}s ${mins}dk`;
        return `${mins}dk`;
    };

    const StatCard = ({ icon, label, value, color = '#8bc34a', bgColor = 'rgba(139, 195, 74, 0.1)' }) => (
        <View style={[styles.statCard, { borderColor: color + '40' }]}>
            <LinearGradient colors={[bgColor, 'rgba(0,0,0,0.2)']} style={styles.statCardGradient}>
                <Text style={styles.statIcon}>{icon}</Text>
                <Text style={[styles.statValue, { color }]}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </LinearGradient>
        </View>
    );

    if (!stats) {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingEmoji}>📊</Text>
                        <Text style={styles.loadingText}>Yükleniyor...</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }

    const safe = (v, d = 0) => (v != null ? v : d);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => { SoundEffects.select(); onBack(); }}
                    >
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerIcon}>📊</Text>
                        <Text style={styles.title}>İSTATİSTİKLER</Text>
                    </View>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Hero Stats */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroCard}>
                            <LinearGradient colors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 215, 0, 0.05)']} style={styles.heroGradient}>
                                <Text style={styles.heroEmoji}>🏆</Text>
                                <View style={styles.heroInfo}>
                                    <Text style={styles.heroLabel}>EN YÜKSEK SKOR</Text>
                                    <Text style={styles.heroValue}>{(safe(stats.bestScore)).toLocaleString()}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Main Stats Grid */}
                    <Text style={styles.sectionTitle}>📈 Genel İstatistikler</Text>
                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="🎮"
                            label="Toplam Oyun"
                            value={safe(stats.totalGames)}
                            color="#4fc3f7"
                            bgColor="rgba(79, 195, 247, 0.1)"
                        />
                        <StatCard
                            icon="💯"
                            label="Toplam Skor"
                            value={(safe(stats.totalScore)).toLocaleString()}
                            color="#9c27b0"
                            bgColor="rgba(156, 39, 176, 0.1)"
                        />
                        <StatCard
                            icon="⏱️"
                            label="Oyun Süresi"
                            value={formatTime(safe(stats.totalPlaytime))}
                            color="#ff9800"
                            bgColor="rgba(255, 152, 0, 0.1)"
                        />
                        <StatCard
                            icon="📊"
                            label="En Yüksek Level"
                            value={`Lv.${safe(stats.highestLevel)}`}
                            color="#8bc34a"
                            bgColor="rgba(139, 195, 74, 0.1)"
                        />
                    </View>

                    {/* Combat Stats */}
                    <Text style={styles.sectionTitle}>⚔️ Savaş İstatistikleri</Text>
                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="💀"
                            label="Öldürülen AI"
                            value={safe(stats.totalAIKills)}
                            color="#ff5252"
                            bgColor="rgba(255, 82, 82, 0.1)"
                        />
                        <StatCard
                            icon="🐍"
                            label="En Uzun Yılan"
                            value={`${safe(stats.longestSnake)}`}
                            color="#4caf50"
                            bgColor="rgba(76, 175, 80, 0.1)"
                        />
                        <StatCard
                            icon="🎯"
                            label="Ortalama Skor"
                            value={safe(stats.totalGames) > 0 ? Math.floor(safe(stats.totalScore) / safe(stats.totalGames)) : 0}
                            color="#ffc107"
                            bgColor="rgba(255, 193, 7, 0.1)"
                        />
                        <StatCard
                            icon="🔥"
                            label="AI/Oyun Oranı"
                            value={safe(stats.totalGames) > 0 ? (safe(stats.totalAIKills) / safe(stats.totalGames)).toFixed(1) : '0'}
                            color="#e91e63"
                            bgColor="rgba(233, 30, 99, 0.1)"
                        />
                    </View>

                    {/* Motivational Message */}
                    <View style={styles.motivationBox}>
                        <Text style={styles.motivationEmoji}>
                            {safe(stats.totalGames) === 0 ? '🎮' : safe(stats.totalAIKills) > 50 ? '🐉' : safe(stats.bestScore) > 1000 ? '🌟' : '💪'}
                        </Text>
                        <Text style={styles.motivationText}>
                            {safe(stats.totalGames) === 0
                                ? 'İlk oyununu oyna ve istatistiklerini oluştur!'
                                : safe(stats.totalAIKills) > 50
                                    ? 'Efsanevi bir avcısın! Yoluna devam et!'
                                    : safe(stats.bestScore) > 1000
                                        ? 'Harika skor! Daha da yüksel!'
                                        : 'Her oyun seni daha iyi yapıyor!'}
                        </Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1 },

    // Loading
    loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    loadingEmoji: { fontSize: 60, marginBottom: 16 },
    loadingText: { fontSize: 16, color: 'rgba(255,255,255,0.6)' },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 16, paddingBottom: 16 },
    backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
    backBtnText: { fontSize: 22, color: '#fff' },
    headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerIcon: { fontSize: 24 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },

    content: { paddingHorizontal: 16, paddingBottom: 40 },

    // Hero Section
    heroSection: { marginBottom: 24 },
    heroCard: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
    heroGradient: { flexDirection: 'row', alignItems: 'center', padding: 24 },
    heroEmoji: { fontSize: 48, marginRight: 16 },
    heroInfo: { flex: 1 },
    heroLabel: { fontSize: 11, color: 'rgba(255, 215, 0, 0.8)', fontWeight: '600', letterSpacing: 1, marginBottom: 4 },
    heroValue: { fontSize: 36, color: '#ffd700', fontWeight: 'bold' },

    // Section Title
    sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#fff', marginBottom: 12, marginTop: 8 },

    // Stats Grid
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
    statCard: { width: (width - 42) / 2, borderRadius: 16, overflow: 'hidden', borderWidth: 1 },
    statCardGradient: { padding: 16, alignItems: 'center' },
    statIcon: { fontSize: 32, marginBottom: 8 },
    statValue: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
    statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },

    // Motivation Box
    motivationBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139, 195, 74, 0.1)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(139, 195, 74, 0.3)', marginTop: 8, gap: 12 },
    motivationEmoji: { fontSize: 36 },
    motivationText: { flex: 1, fontSize: 14, color: '#8bc34a', fontWeight: '500', lineHeight: 20 },
});

export default StatsScreen;
