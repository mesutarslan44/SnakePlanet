import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getAchievements, getStats } from '../utils/StorageManager';
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES } from '../constants/Achievements';
import { SoundEffects } from '../utils/SoundManager';

const { width } = Dimensions.get('window');

const AchievementsScreen = ({ onBack }) => {
    const [achievements, setAchievements] = useState({});
    const [stats, setStats] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        loadData();
    }, []);

    const DEFAULT_STATS = { totalGames: 0, totalScore: 0, bestScore: 0, totalAIKills: 0, longestSnake: 0, highestLevel: 0, totalPlaytime: 0 };

    const loadData = async () => {
        const achData = await getAchievements();
        const statsData = await getStats();
        setAchievements(achData || {});
        setStats(statsData || DEFAULT_STATS);
    };

    const getProgress = (ach) => {
        const data = achievements[ach.id];
        if (data?.unlocked) return { current: ach.requirement.value, max: ach.requirement.value, unlocked: true };

        const { type, value } = ach.requirement;
        let current = 0;
        const s = stats || DEFAULT_STATS;

        switch (type) {
            case 'score': current = s.bestScore ?? 0; break;
            case 'ai_kills': current = s.totalAIKills ?? 0; break;
            case 'level': current = s.highestLevel ?? 0; break;
            case 'snake_length': current = s.longestSnake ?? 0; break;
            case 'zones_visited': current = s.zonesVisitedCount ?? 0; break;
            case 'boss_kills': current = s.bossKills ?? 0; break;
            case 'survival_time': current = 0; break;
            default: current = 0;
        }
        const max = typeof value === 'number' ? value : 1;
        return { current: Math.min(current, max), max, unlocked: false };
    };

    const filteredAchievements = selectedCategory === 'all'
        ? ACHIEVEMENTS
        : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

    const unlockedCount = ACHIEVEMENTS.filter(a => achievements[a.id]?.unlocked).length;
    const totalCount = ACHIEVEMENTS.length;

    const renderAchievement = ({ item: ach }) => {
        const progress = getProgress(ach);
        const percentage = (progress.current / progress.max) * 100;

        return (
            <View style={[styles.achCard, progress.unlocked && styles.achCardUnlocked]}>
                <View style={styles.achLeft}>
                    <View style={[styles.achIconContainer, progress.unlocked && styles.achIconUnlocked]}>
                        <Text style={styles.achIcon}>{ach.icon}</Text>
                    </View>
                </View>
                <View style={styles.achContent}>
                    <View style={styles.achHeader}>
                        <Text style={[styles.achName, progress.unlocked && styles.achNameUnlocked]}>
                            {ach.name}
                        </Text>
                        {progress.unlocked && <Text style={styles.achCheckmark}>✓</Text>}
                    </View>
                    <Text style={styles.achDesc}>{ach.description}</Text>

                    {!progress.unlocked && (
                        <View style={styles.progressSection}>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { width: `${percentage}%` }]} />
                            </View>
                            <Text style={styles.progressText}>{progress.current}/{progress.max}</Text>
                        </View>
                    )}

                    <View style={styles.achFooter}>
                        <View style={[styles.rewardBadge, progress.unlocked && styles.rewardBadgeUnlocked]}>
                            <Text style={styles.rewardText}>🎁 +{ach.reward}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { SoundEffects.select(); onBack(); }}>
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerIcon}>🏆</Text>
                        <Text style={styles.title}>BAŞARIMLAR</Text>
                    </View>
                    <View style={{ width: 44 }} />
                </View>

                {/* Progress Summary */}
                <View style={styles.summaryCard}>
                    <LinearGradient colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.05)']} style={styles.summaryGradient}>
                        <View style={styles.summaryCircle}>
                            <Text style={styles.summaryCount}>{unlockedCount}</Text>
                            <Text style={styles.summaryTotal}>/{totalCount}</Text>
                        </View>
                        <View style={styles.summaryInfo}>
                            <Text style={styles.summaryLabel}>Kazanılan Başarımlar</Text>
                            <View style={styles.summaryBar}>
                                <View style={[styles.summaryFill, { width: `${(unlockedCount / totalCount) * 100}%` }]} />
                            </View>
                            <Text style={styles.summaryPercent}>{Math.round((unlockedCount / totalCount) * 100)}% Tamamlandı</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Category Tabs */}
                <View style={styles.categoryContainer}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={ACHIEVEMENT_CATEGORIES}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.categoryList}
                        renderItem={({ item: cat }) => (
                            <TouchableOpacity
                                style={[styles.categoryTab, selectedCategory === cat.id && styles.categoryTabActive]}
                                onPress={() => { SoundEffects.select(); setSelectedCategory(cat.id); }}
                            >
                                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                                <Text style={[styles.categoryText, selectedCategory === cat.id && styles.categoryTextActive]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Achievement List */}
                <FlatList
                    data={filteredAchievements}
                    renderItem={renderAchievement}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1 },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 16, paddingBottom: 12 },
    backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
    backBtnText: { fontSize: 22, color: '#fff' },
    headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerIcon: { fontSize: 24 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },

    // Summary Card
    summaryCard: { marginHorizontal: 16, marginBottom: 16, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)' },
    summaryGradient: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    summaryCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255, 215, 0, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    summaryCount: { fontSize: 28, fontWeight: 'bold', color: '#ffd700' },
    summaryTotal: { fontSize: 14, color: 'rgba(255, 215, 0, 0.7)' },
    summaryInfo: { flex: 1 },
    summaryLabel: { fontSize: 13, color: '#fff', fontWeight: '600', marginBottom: 8 },
    summaryBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
    summaryFill: { height: '100%', backgroundColor: '#ffd700', borderRadius: 4 },
    summaryPercent: { fontSize: 11, color: 'rgba(255, 215, 0, 0.8)' },

    // Category Tabs
    categoryContainer: { marginBottom: 12 },
    categoryList: { paddingHorizontal: 12 },
    categoryTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, marginHorizontal: 4, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'transparent' },
    categoryTabActive: { backgroundColor: 'rgba(139, 195, 74, 0.2)', borderColor: '#8bc34a' },
    categoryIcon: { fontSize: 16, marginRight: 6 },
    categoryText: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
    categoryTextActive: { color: '#8bc34a', fontWeight: '600' },

    // Achievement List
    list: { paddingHorizontal: 16, paddingBottom: 20 },
    achCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    achCardUnlocked: { borderColor: 'rgba(139, 195, 74, 0.4)', backgroundColor: 'rgba(139, 195, 74, 0.08)' },
    achLeft: { marginRight: 14 },
    achIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
    achIconUnlocked: { backgroundColor: 'rgba(139, 195, 74, 0.2)' },
    achIcon: { fontSize: 28 },
    achContent: { flex: 1 },
    achHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
    achName: { fontSize: 15, fontWeight: 'bold', color: '#fff', flex: 1 },
    achNameUnlocked: { color: '#8bc34a' },
    achCheckmark: { fontSize: 18, color: '#8bc34a', marginLeft: 8 },
    achDesc: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8, lineHeight: 16 },

    progressSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
    progressBar: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#8bc34a', borderRadius: 3 },
    progressText: { fontSize: 10, color: 'rgba(255,255,255,0.5)', minWidth: 40, textAlign: 'right' },

    achFooter: { flexDirection: 'row' },
    rewardBadge: { backgroundColor: 'rgba(255, 215, 0, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    rewardBadgeUnlocked: { backgroundColor: 'rgba(139, 195, 74, 0.2)' },
    rewardText: { fontSize: 11, color: '#ffd700', fontWeight: '600' },
});

export default AchievementsScreen;
