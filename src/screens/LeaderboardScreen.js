import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getLeaderboard } from '../utils/StorageManager';
import { SoundEffects } from '../utils/SoundManager';

const { width } = Dimensions.get('window');

const LeaderboardScreen = ({ onBack }) => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {
        const data = await getLeaderboard();
        setLeaderboard(data);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    const getMedalIcon = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}.`;
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { SoundEffects.select(); onBack(); }}>
                        <Text style={styles.backBtnText}>← GERİ</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>🏅 LEADERBOARD</Text>
                    <View style={{ width: 60 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {leaderboard.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🎮</Text>
                            <Text style={styles.emptyText}>Henüz oyun oynamadınız!</Text>
                            <Text style={styles.emptySubtext}>İlk oyununuzu oynayın ve leaderboard'a girin</Text>
                        </View>
                    ) : (
                        leaderboard.map((entry, index) => (
                            <View key={index} style={[styles.entryCard, index === 0 && styles.topEntry]}>
                                <View style={styles.entryRank}>
                                    <Text style={[styles.entryRankText, index < 3 && styles.entryMedal]}>
                                        {getMedalIcon(index)}
                                    </Text>
                                </View>
                                <View style={styles.entryInfo}>
                                    <View style={styles.entryRow}>
                                        <Text style={styles.entryScore}>{entry.score.toLocaleString()} puan</Text>
                                        <Text style={styles.entryLevel}>Level {entry.level}</Text>
                                    </View>
                                    <View style={styles.entryRow}>
                                        <Text style={styles.entryDetail}>💀 {entry.aiKills} AI</Text>
                                        <Text style={styles.entryDetail}>🐍 {entry.snakeLength} segment</Text>
                                        <Text style={styles.entryDate}>{formatDate(entry.timestamp)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 15, paddingBottom: 15 },
    backBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 },
    backBtnText: { fontSize: 14, color: '#fff', fontWeight: '600' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },

    content: { paddingHorizontal: 20, paddingBottom: 40 },

    emptyState: { alignItems: 'center', marginTop: 100 },
    emptyIcon: { fontSize: 64, marginBottom: 20 },
    emptyText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    emptySubtext: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },

    entryCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    topEntry: { borderColor: '#ffd700', backgroundColor: 'rgba(255, 215, 0, 0.1)' },
    entryRank: { width: 40, alignItems: 'center', justifyContent: 'center' },
    entryRankText: { fontSize: 16, fontWeight: 'bold', color: 'rgba(255,255,255,0.5)' },
    entryMedal: { fontSize: 24, color: '#ffd700' },
    entryInfo: { flex: 1 },
    entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    entryScore: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
    entryLevel: { fontSize: 14, color: '#8bc34a' },
    entryDetail: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },
    entryDate: { fontSize: 10, color: 'rgba(255,255,255,0.4)' },
});

export default LeaderboardScreen;
