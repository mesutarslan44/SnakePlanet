import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AchievementNotification = ({ achievement, onDismiss }) => {
    const slideAnim = useRef(new Animated.Value(-150)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Slide in + fade in
        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: 50,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto-dismiss after 3 seconds
        const timeout = setTimeout(() => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -150,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onDismiss && onDismiss();
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    if (!achievement) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: fadeAnim,
                },
            ]}
        >
            <View style={styles.content}>
                <Text style={styles.badge}>✨</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>BAŞARIM AÇILDI!</Text>
                    <View style={styles.achInfo}>
                        <Text style={styles.achIcon}>{achievement.icon}</Text>
                        <Text style={styles.achName}>{achievement.name}</Text>
                    </View>
                    <Text style={styles.achReward}>🎁 +{achievement.reward} puan</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        zIndex: 9999,
    },
    content: {
        backgroundColor: 'rgba(139, 195, 74, 0.95)',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#8bc34a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        borderWidth: 2,
        borderColor: '#8bc34a',
    },
    badge: {
        fontSize: 32,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 1,
        marginBottom: 4,
    },
    achInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    achIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    achName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    achReward: {
        fontSize: 10,
        color: '#ffffdd',
        fontWeight: '600',
    },
});

export default AchievementNotification;
