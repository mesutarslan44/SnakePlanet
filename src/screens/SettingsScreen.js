import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SKINS, COLORS } from '../constants/GameConfig';
import { getSettings, saveSettings } from '../utils/StorageManager';
import { setSoundEnabled, SoundEffects } from '../utils/SoundManager';

const { width } = Dimensions.get('window');

const SettingsScreen = ({ onBack, onSkinChange, currentSkin = 'forest' }) => {
    const [soundOn, setSoundOn] = useState(true);
    const [vibrationOn, setVibrationOn] = useState(true);
    const [selectedSkin, setSelectedSkin] = useState(currentSkin);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const settings = await getSettings();
            setSoundOn(settings?.soundOn ?? true);
            setVibrationOn(settings?.vibrationOn ?? true);
            setSelectedSkin(settings?.selectedSkin || 'forest');
            setSoundEnabled(settings?.soundOn ?? true);
        } catch (error) {
            console.log('Settings load error:', error);
        }
    };

    const handleSoundToggle = async (value) => {
        setSoundOn(value);
        setSoundEnabled(value);
        const settings = await getSettings();
        await saveSettings({ ...settings, soundOn: value });
        if (value) SoundEffects.select();
    };

    const handleVibrationToggle = async (value) => {
        setVibrationOn(value);
        const settings = await getSettings();
        await saveSettings({ ...settings, vibrationOn: value });
        SoundEffects.select();
    };

    const handleSkinSelect = async (skinId) => {
        setSelectedSkin(skinId);
        const settings = await getSettings();
        await saveSettings({ ...settings, selectedSkin: skinId });
        if (onSkinChange) onSkinChange(skinId);
        SoundEffects.select();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { SoundEffects.select(); onBack(); }}>
                        <Text style={styles.backBtnText}>← GERİ</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>⚙️ AYARLAR</Text>
                    <View style={{ width: 60 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Sound Settings */}
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingEmoji}>🔊</Text>
                            <View>
                                <Text style={styles.settingLabel}>Ses Efektleri</Text>
                                <Text style={styles.settingDesc}>Oyun sesleri</Text>
                            </View>
                        </View>
                        <Switch value={soundOn} onValueChange={handleSoundToggle} trackColor={{ false: '#555', true: COLORS.UI_PRIMARY }} thumbColor={soundOn ? '#fff' : '#ccc'} />
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingEmoji}>📳</Text>
                            <View>
                                <Text style={styles.settingLabel}>Titreşim</Text>
                                <Text style={styles.settingDesc}>Dokunsal geri bildirim</Text>
                            </View>
                        </View>
                        <Switch value={vibrationOn} onValueChange={handleVibrationToggle} trackColor={{ false: '#555', true: COLORS.UI_PRIMARY }} thumbColor={vibrationOn ? '#fff' : '#ccc'} />
                    </View>

                    {/* Skins Gallery Section */}
                    <Text style={styles.sectionTitle}>🐍 YILAN TEMALARI</Text>
                    <Text style={styles.sectionSubtitle}>Oyunda kullanabileceğin tüm yılan görünümleri</Text>

                    <View style={styles.skinsGrid}>
                        {SKINS.map((skin) => {
                            const isSelected = selectedSkin === skin.id;
                            return (
                                <TouchableOpacity
                                    key={skin.id}
                                    style={[styles.skinCard, isSelected && styles.skinCardSelected]}
                                    onPress={() => handleSkinSelect(skin.id)}
                                >
                                    {isSelected && <Text style={styles.selectedBadge}>✓</Text>}
                                    <View style={[styles.skinPreview, { backgroundColor: skin.headColor }]}>
                                        <Text style={styles.skinIcon}>{skin.icon}</Text>
                                    </View>
                                    <Text style={styles.skinName}>{skin.name}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoEmoji}>🎨</Text>
                        <Text style={styles.infoText}>Bir tema seç ve hemen oynamaya başla!</Text>
                    </View>

                    <Text style={styles.version}>Yılan.io v1.0</Text>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    backBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 8,
    },
    backBtnText: { fontSize: 14, color: '#fff', fontWeight: '600' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    settingEmoji: { fontSize: 28 },
    settingLabel: { fontSize: 16, fontWeight: '600', color: '#fff' },
    settingDesc: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.UI_PRIMARY,
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    sectionSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        marginBottom: 15,
    },
    skinsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
    skinCard: {
        width: (width - 60) / 3,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    skinCardSelected: {
        borderColor: COLORS.UI_PRIMARY,
        backgroundColor: 'rgba(139, 195, 74, 0.2)',
    },
    selectedBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        fontSize: 14,
        color: COLORS.UI_PRIMARY,
        fontWeight: 'bold',
    },
    skinPreview: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    skinIcon: { fontSize: 24 },
    skinName: { fontSize: 10, color: '#fff', textAlign: 'center' },
    infoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 20,
        padding: 15,
        backgroundColor: 'rgba(139, 195, 74, 0.15)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(139, 195, 74, 0.3)',
    },
    infoEmoji: { fontSize: 24 },
    infoText: { fontSize: 14, color: COLORS.UI_PRIMARY, fontWeight: '500' },
    version: {
        marginTop: 30,
        fontSize: 12,
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
    },
});

export default SettingsScreen;
