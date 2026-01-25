import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions, Vibration, Platform } from 'react-native';
import { COLORS } from '../constants/GameConfig';

const { width } = Dimensions.get('window');
const JOYSTICK_SIZE = 140;
const THUMB_SIZE = 60;
const MAX_DISTANCE = (JOYSTICK_SIZE - THUMB_SIZE) / 2;

const Joystick = ({ onMove, onRelease }) => {
    const [thumbPosition, setThumbPosition] = useState({ x: 0, y: 0 });
    const hasVibratedThisGesture = useRef(false);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                hasVibratedThisGesture.current = false;
            },

            onPanResponderMove: (evt, gestureState) => {
                let dx = gestureState.dx;
                let dy = gestureState.dy;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > MAX_DISTANCE) {
                    dx = (dx / distance) * MAX_DISTANCE;
                    dy = (dy / distance) * MAX_DISTANCE;
                }

                setThumbPosition({ x: dx, y: dy });

                if (distance > 10) {
                    if (!hasVibratedThisGesture.current && Platform.OS !== 'web') {
                        Vibration.vibrate(6);
                        hasVibratedThisGesture.current = true;
                    }
                    const normalizedX = dx / MAX_DISTANCE;
                    const normalizedY = dy / MAX_DISTANCE;
                    onMove(normalizedX, normalizedY);
                }
            },

            onPanResponderRelease: () => {
                setThumbPosition({ x: 0, y: 0 });
                onRelease();
            },

            onPanResponderTerminate: () => {
                setThumbPosition({ x: 0, y: 0 });
                onRelease();
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <View style={styles.joystickBase} {...panResponder.panHandlers}>
                {/* Direction indicators */}
                <View style={styles.directionUp}><View style={styles.arrow} /></View>
                <View style={styles.directionDown}><View style={styles.arrowDown} /></View>
                <View style={styles.directionLeft}><View style={styles.arrowLeft} /></View>
                <View style={styles.directionRight}><View style={styles.arrowRight} /></View>

                {/* Thumb */}
                <View
                    style={[
                        styles.thumb,
                        {
                            transform: [
                                { translateX: thumbPosition.x },
                                { translateY: thumbPosition.y },
                            ],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    joystickBase: {
        width: JOYSTICK_SIZE,
        height: JOYSTICK_SIZE,
        borderRadius: JOYSTICK_SIZE / 2,
        backgroundColor: COLORS.JOYSTICK_BG,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        backgroundColor: COLORS.JOYSTICK_THUMB,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        shadowColor: '#7cb342',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
    directionUp: {
        position: 'absolute',
        top: 8,
    },
    directionDown: {
        position: 'absolute',
        bottom: 8,
    },
    directionLeft: {
        position: 'absolute',
        left: 8,
    },
    directionRight: {
        position: 'absolute',
        right: 8,
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    arrowDown: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
    },
    arrowLeft: {
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderRightWidth: 12,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'rgba(255, 255, 255, 0.3)',
    },
    arrowRight: {
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderLeftWidth: 12,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default Joystick;
