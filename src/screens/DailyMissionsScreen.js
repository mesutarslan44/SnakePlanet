import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getDailyMissions, saveDailyMissions, getLastMissionReset, setLastMissionReset } from '../utils/StorageManager';
import { generateDailyMissions, shouldResetMissions, getTimeUntilReset } from '../constants/DailyMissions';
import { SoundEffects } from '../utils/SoundManager';

const { width } = Dimensions.get('window');

const DailyMissionsScreen = ({ onBack }) => {
    const [missions, setMissions] = useState(null);
    const [timeUntilReset, setTimeUntilReset] = useState({ hours: 0, minutes: 0 });

    useEffect(() => {
        loadMissions();
        const interval = setInterval(() => {
            setTimeUntilReset(getTimeUntilReset());
        }, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const loadMissions = async () => {
        const lastReset = await getLastMissionReset();

        if (shouldResetMissions(lastReset)) {
            // Generate new missions
            const newMissions = {
                missions: generateDailyMissions(),
                createdAt: Date.now(),
            };
            await saveDailyMissions(newMissions);
            await setLastMissionReset(Date.now());
            setMissions(newMissions);
        } else {
            const existingMissions = await getDailyMissions();
            if (existingMissions) {
                setMissions(existingMissions);
            } else {
                // First time
                const newMissions = {
                    missions: generateDailyMissions(),
                    createdAt: Date.now(),
                };
                await saveDailyMissions(newMissions);
                await setLastMissionReset(Date.now());
                setMissions(newMissions);
            }
        }
        setTimeUntilReset(getTimeUntilReset());
    };

    const getDifficultyColor = (diff) => {
        if (diff === 'easy') return '#8bc34a';
        if (diff === 'medium') return '#ff9800';
        return '#ff5252';
    };

    const renderMission = (mission, index) => {
        const percentage = (mission.progress / mission.requirement.value) * 100;
        const difficultyColor = getDifficultyColor(mission.difficulty);

        return (
            <View key={index} style={[styles.missionCard, mission.completed && styles.missionCompleted]}>
                <View style={styles.missionHeader}>
                    <Text style={styles.missionIcon}>{mission.icon}</Text>
                    <View style={styles.missionInfo}>
                        <Text style={styles.missionName}>{mission.name}</Text>
                        <Text style={styles.missionDesc}>{mission.description}</Text>
                    </View>
                    {mission.completed && <Text style={styles.completedBadge}>✓</Text>}
                </View>

                {!mission.completed && (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: difficultyColor }]} />
                        </View>
                        <Text style={styles.progressText}>{mission.progress} / {mission.requirement.value}</Text>
                    </View>
                )}

                <View style={styles.missionFooter}>
                    <View style={[styles.difficultyBadge, { backgroundColor: `${difficultyColor}20`, borderColor: difficultyColor }]}>
                        <Text style={[styles.difficultyText, { color: difficultyColor }]}>
                            {mission.difficulty === 'easy' ? 'Kolay' : mission.difficulty === 'medium' ? 'Orta' : 'Zor'}
                        </Text>
                    </View>
                    <Text style={styles.rewardText}>🎁 {mission.reward} puan</Text>
                </View>
            </View>
        );
    };

    if (!missions) {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                    <Text style={styles.loading}>Yükleniyor...</Text>
                </LinearGradient>
            </View>
        );
    }

    const completedCount = missions.missions.filter(m => m.completed).length;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { SoundEffects.select(); onBack(); }}>
                        <Text style={styles.backBtnText}>← GERİ</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>📋 GÜNLÜK GÖREVLER</Text>
                    <View style={{ width: 60 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Reset Timer */}
                    <View style={styles.timerBox}>
                        <Text style={styles.timerIcon}>⏰</Text>
                        <View>
                            <Text style={styles.timerLabel}>Yeni görevler</Text>
                            <Text style={styles.timerValue}>{timeUntilReset.hours}s {timeUntilReset.minutes}dk sonra</Text>
                        </View>
                    </View>

                    {/* Progress */}
                    <View style={styles.progressBox}>
                        <Text style={styles.progressBoxText}>
                            {completedCount} / {missions.missions.length} Görev Tamamlandı
                        </Text>
                    </View>

                    {/* Missions */}
                    {missions.missions.map((mission, index) => renderMission(mission, index))}
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1 },
    loading: { flex: 1, textAlign: 'center', color: '#fff', marginTop: 100 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 15, paddingBottom: 15 },
    backBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 },
    backBtnText: { fontSize: 14, color: '#fff', fontWeight: '600' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },

    content: { paddingHorizontal: 20, paddingBottom: 40 },

    timerBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.3)', gap: 12 },
    timerIcon: { fontSize: 32 },
    timerLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
    timerValue: { fontSize: 16, fontWeight: 'bold', color: '#ffd700' },

    progressBox: { backgroundColor: 'rgba(139, 195, 74, 0.15)', padding: 12, borderRadius: 12, marginBottom: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(139, 195, 74, 0.3)' },
    progressBoxText: { fontSize: 14, fontWeight: '600', color: '#8bc34a' },

    missionCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    missionCompleted: { borderColor: '#8bc34a', backgroundColor: 'rgba(139, 195, 74, 0.1)' },
    missionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    missionIcon: { fontSize: 32, marginRight: 12 },
    missionInfo: { flex: 1 },
    missionName: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
    missionDesc: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
    completedBadge: { fontSize: 24, color: '#8bc34a' },

    progressContainer: { marginBottom: 10 },
    progressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
    progressFill: { height: '100%' },
    progressText: { fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'right' },

    missionFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    difficultyBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
    difficultyText: { fontSize: 11, fontWeight: '600' },
    rewardText: { fontSize: 11, color: '#ffd700' },
});

export default DailyMissionsScreen;
