import { Audio } from 'expo-av';
import { getSettings, saveSettings } from './StorageManager';

let backgroundMusicSound = null;
let isMusicEnabled = true;

// Initialize music settings
export const initMusicManager = async () => {
    const settings = await getSettings();
    isMusicEnabled = settings?.musicOn ?? true;
};

// Load and play background music
export const playBackgroundMusic = async (musicFile) => {
    try {
        if (!isMusicEnabled) return;

        // Stop current music if playing
        if (backgroundMusicSound) {
            await backgroundMusicSound.stopAsync();
            await backgroundMusicSound.unloadAsync();
        }

        // Load new music
        const { sound } = await Audio.Sound.createAsync(musicFile, {
            isLooping: true,
            volume: 0.3, // 30% volume
        });

        backgroundMusicSound = sound;
        await sound.playAsync();
    } catch (error) {
        console.log('Error playing music:', error);
    }
};

// Stop background music
export const stopBackgroundMusic = async () => {
    try {
        if (backgroundMusicSound) {
            await backgroundMusicSound.stopAsync();
            await backgroundMusicSound.unloadAsync();
            backgroundMusicSound = null;
        }
    } catch (error) {
        console.log('Error stopping music:', error);
    }
};

// Toggle music on/off
export const setMusicEnabled = async (enabled) => {
    isMusicEnabled = enabled;
    const settings = await getSettings();
    await saveSettings({ ...settings, musicOn: enabled });

    if (!enabled && backgroundMusicSound) {
        await stopBackgroundMusic();
    }
};

// Check if music is enabled
export const isMusicOn = () => isMusicEnabled;

// Fade out music (for transitions)
export const fadeMusicOut = async (duration = 1000) => {
    if (!backgroundMusicSound) return;

    try {
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = 0.3 / steps;

        for (let i = 0; i < steps; i++) {
            await new Promise(resolve => setTimeout(resolve, stepDuration));
            const newVolume = Math.max(0, 0.3 - (volumeStep * (i + 1)));
            await backgroundMusicSound.setVolumeAsync(newVolume);
        }

        await stopBackgroundMusic();
    } catch (error) {
        console.log('Error fading music:', error);
    }
};

// Fade in music (for transitions)
export const fadeMusicIn = async (musicFile, duration = 1000) => {
    try {
        if (!isMusicEnabled) return;

        await playBackgroundMusic(musicFile);

        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = 0.3 / steps;

        if (backgroundMusicSound) {
            await backgroundMusicSound.setVolumeAsync(0);

            for (let i = 0; i < steps; i++) {
                await new Promise(resolve => setTimeout(resolve, stepDuration));
                const newVolume = Math.min(0.3, volumeStep * (i + 1));
                await backgroundMusicSound.setVolumeAsync(newVolume);
            }
        }
    } catch (error) {
        console.log('Error fading in music:', error);
    }
};

// Map of zone IDs to music files (when you add music files)
// TODO: Uncomment when music files are added to assets/music/
export const ZONE_MUSIC = {
    // forest: require('../../assets/music/forest.mp3'),
    // desert: require('../../assets/music/desert.mp3'),
    // snow: require('../../assets/music/snow.mp3'),
    // night: require('../../assets/music/night.mp3'),
    // lava: require('../../assets/music/lava.mp3'),
    // ocean: require('../../assets/music/ocean.mp3'),
    // jungle: require('../../assets/music/jungle.mp3'),
    // space: require('../../assets/music/space.mp3'),
    // candy: require('../../assets/music/candy.mp3'),
    // neon: require('../../assets/music/neon.mp3'),
    // crystal: require('../../assets/music/crystal.mp3'),
    // poison: require('../../assets/music/poison.mp3'),
    // electric: require('../../assets/music/electric.mp3'),
    // shadow: require('../../assets/music/shadow.mp3'),
    // sakura: require('../../assets/music/sakura.mp3'),
    // gold: require('../../assets/music/gold.mp3'),
    // dragon: require('../../assets/music/dragon.mp3'),
    // cosmic: require('../../assets/music/cosmic.mp3'),
};
