import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { setTutorialCompleted } from '../utils/StorageManager';
import { SoundEffects } from '../utils/SoundManager';

const { width, height } = Dimensions.get('window');

const TUTORIAL_STEPS = [
    {
        id: 1,
        title: 'Joystick Kontrolü',
        description: 'Oyun başladığında alt kısımda joystick ile yılanını yönlendir!',
        icon: '🎮',
    },
    {
        id: 2,
        title: 'Avlan ve Büyü',
        description: 'Yemekleri ye ve büyü. Her yemek puanını artırır!',
        icon: '🍖',
        icons: ['🐁', '🐸', '🐇', '🐦'],
    },
    {
        id: 3,
        title: 'AI Yılanları',
        description: 'Rakip yılanları öldür, şekerlerini topla ve daha da büyü!',
        icon: '🐍',
        warning: 'Dikkat: Onlar da seni öldürebilir!',
    },
    {
        id: 4,
        title: 'Engeller',
        description: 'Kayalardan, mantarlardan ve kütüklerden kaçın! Etraflarında kırmızı uyarı halkası var.',
        icon: '💀',
        icons: ['🪨', '🍄', '🪵'],
        warning: 'Çarpma = Ölüm!',
    },
    {
        id: 5,
        title: 'Hazırsın!',
        description: 'Artık oyunu oynamaya hazırsın. İyi şanslar!',
        icon: '🏆',
    },
];

const TutorialScreen = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));

    const step = TUTORIAL_STEPS[currentStep];

    const handleNext = () => {
        SoundEffects.select();
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setCurrentStep(currentStep + 1);
                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            });
        } else {
            handleFinish();
        }
    };

    const handleSkip = () => {
        SoundEffects.select();
        handleFinish();
    };

    const handleFinish = async () => {
        await setTutorialCompleted();
        onComplete();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={['#1a3320', '#0d1a12', '#050a07']} style={styles.gradient}>
                {/* Skip Button */}
                <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                    <Text style={styles.skipText}>Atla →</Text>
                </TouchableOpacity>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    {TUTORIAL_STEPS.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.progressDot,
                                index === currentStep && styles.progressDotActive,
                                index < currentStep && styles.progressDotCompleted,
                            ]}
                        />
                    ))}
                </View>

                {/* Content */}
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <Text style={styles.stepIcon}>{step.icon}</Text>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDescription}>{step.description}</Text>

                    {/* Extra icons */}
                    {step.icons && (
                        <View style={styles.iconsRow}>
                            {step.icons.map((icon, i) => (
                                <View key={i} style={styles.iconBox}>
                                    <Text style={styles.iconText}>{icon}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Warning */}
                    {step.warning && (
                        <View style={styles.warningBox}>
                            <Text style={styles.warningText}>⚠️ {step.warning}</Text>
                        </View>
                    )}
                </Animated.View>

                {/* Next Button */}
                <TouchableOpacity
                    style={[
                        styles.nextBtn,
                        currentStep === TUTORIAL_STEPS.length - 1 && styles.finishBtn,
                    ]}
                    onPress={handleNext}
                >
                    <LinearGradient
                        colors={
                            currentStep === TUTORIAL_STEPS.length - 1
                                ? ['#ffc107', '#ff9800']
                                : ['#8bc34a', '#689f38']
                        }
                        style={styles.nextBtnGradient}
                    >
                        <Text style={styles.nextBtnText}>
                            {currentStep === TUTORIAL_STEPS.length - 1 ? '🎮 OYUNA BAŞLA' : 'Devam →'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Step Counter */}
                <Text style={styles.stepCounter}>
                    {currentStep + 1} / {TUTORIAL_STEPS.length}
                </Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { flex: 1, paddingTop: 50 },
    skipBtn: {
        position: 'absolute',
        top: 55,
        right: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        zIndex: 10,
    },
    skipText: { fontSize: 14, color: '#fff', fontWeight: '600' },

    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginTop: 20,
        marginBottom: 40,
    },
    progressDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressDotActive: {
        backgroundColor: '#8bc34a',
        width: 30,
    },
    progressDotCompleted: {
        backgroundColor: '#8bc34a',
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    stepIcon: { fontSize: 80, marginBottom: 20 },
    stepTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
    },
    stepDescription: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 24,
    },

    iconsRow: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 30,
    },
    iconBox: {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(139, 195, 74, 0.3)',
    },
    iconText: { fontSize: 28 },

    warningBox: {
        marginTop: 25,
        backgroundColor: 'rgba(255, 82, 82, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 82, 82, 0.4)',
    },
    warningText: { fontSize: 14, color: '#ff5252', fontWeight: '600' },

    nextBtn: {
        position: 'absolute',
        bottom: 80,
        left: 30,
        right: 30,
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 8,
    },
    finishBtn: {},
    nextBtnGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    nextBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },

    stepCounter: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
    },
});

export default TutorialScreen;
