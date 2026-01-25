import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SoundEffects } from '../utils/SoundManager';

const { width, height } = Dimensions.get('window');

const PauseMenu = ({ onResume, onRestart, onSettings, onQuit, visible }) => {
    const [countdown, setCountdown] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.8);
        }
    }, [visible]);

    const handleResume = () => {
        SoundEffects.select();
        // Start countdown
        setCountdown(3);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onResume();
                    return 0;
                }
                SoundEffects.select();
                return prev - 1;
            });
        }, 1000);
    };

    const handleRestart = () => {
        SoundEffects.select();
        onRestart();
    };

    const handleSettings = () => {
        SoundEffects.select();
        onSettings && onSettings();
    };

    const handleQuit = () => {
        SoundEffects.select();
        onQuit();
    };

    if (!visible) return null;

    return (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.menu, { transform: [{ scale: scaleAnim }] }]}>
                {countdown > 0 ? (
                    // Countdown View
                    <View style={styles.countdownContainer}>
                        <Text style={styles.countdownText}>{countdown}</Text>
                        <Text style={styles.countdownLabel}>Hazırlan!</Text>
                    </View>
                ) : (
                    // Menu View
                    <>
                        <Text style={styles.pauseTitle}>⏸ DURAKLADI</Text>

                        <TouchableOpacity style={styles.menuButton} onPress={handleResume}>
                            <LinearGradient colors={['#8bc34a', '#689f38']} style={styles.menuButtonGradient}>
                                <Text style={styles.menuButtonText}>▶ Devam Et</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuButton} onPress={handleRestart}>
                            <LinearGradient colors={['#ff9800', '#f57c00']} style={styles.menuButtonGradient}>
                                <Text style={styles.menuButtonText}>🔄 Yeniden Başlat</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {onSettings && (
                            <TouchableOpacity style={styles.menuButton} onPress={handleSettings}>
                                <View style={styles.menuButtonOutline}>
                                    <Text style={styles.menuButtonTextOutline}>⚙️ Ayarlar</Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={styles.menuButton} onPress={handleQuit}>
                            <View style={styles.menuButtonOutline}>
                                <Text style={styles.menuButtonTextOutline}>🏠 Ana Menü</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    menu: {
        width: width * 0.8,
        maxWidth: 400,
        backgroundColor: '#1a2f1a',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#8bc34a',
    },
    pauseTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
    },
    menuButton: {
        width: '100%',
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuButtonGradient: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    menuButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    menuButtonOutline: {
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
    },
    menuButtonTextOutline: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    countdownContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    countdownText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#8bc34a',
        marginBottom: 10,
    },
    countdownLabel: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
    },
});

export default PauseMenu;
