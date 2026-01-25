// 🔊 Sound Manager for SnakePlanet
import { Audio } from 'expo-av';

// Sound file imports
const SOUNDS = {
    eat: require('../../assets/sounds/capture.mp3'),
    attack: require('../../assets/sounds/attack.mp3'),
    powerup: require('../../assets/sounds/powerup.mp3'),
    levelup: require('../../assets/sounds/victory.mp3'),
    gameover: require('../../assets/sounds/defeat.mp3'),
    select: require('../../assets/sounds/select.mp3'),
};

// Preloaded sound objects
let loadedSounds = {};
let soundEnabled = true;

// Initialize audio mode for mobile
export const initAudio = async () => {
    try {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
        });
    } catch (error) {
        console.log('Audio init error:', error);
    }
};

// Preload all sounds for faster playback
export const preloadSounds = async () => {
    try {
        for (const [key, source] of Object.entries(SOUNDS)) {
            const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: false });
            loadedSounds[key] = sound;
        }
        console.log('✅ All sounds preloaded');
    } catch (error) {
        console.log('Sound preload error:', error);
    }
};

// Play a sound by key
export const playSound = async (soundKey, volume = 0.7) => {
    if (!soundEnabled) return;

    try {
        const sound = loadedSounds[soundKey];
        if (sound) {
            await sound.setPositionAsync(0);
            await sound.setVolumeAsync(volume);
            await sound.playAsync();
        }
    } catch (error) {
        // Silently fail - don't crash game for sound errors
        console.log(`Sound play error (${soundKey}):`, error);
    }
};

// Toggle sound on/off
export const setSoundEnabled = (enabled) => {
    soundEnabled = enabled;
};

export const isSoundEnabled = () => soundEnabled;

// Cleanup sounds on unmount
export const unloadSounds = async () => {
    try {
        for (const sound of Object.values(loadedSounds)) {
            await sound.unloadAsync();
        }
        loadedSounds = {};
    } catch (error) {
        console.log('Sound unload error:', error);
    }
};

// Quick play functions for common game events
export const SoundEffects = {
    eat: () => playSound('eat', 0.5),
    attack: () => playSound('attack', 0.8),
    powerup: () => playSound('powerup', 0.7),
    levelup: () => playSound('levelup', 0.3),
    gameover: () => playSound('gameover', 0.9),
    select: () => playSound('select', 0.4),
};

export default SoundEffects;
