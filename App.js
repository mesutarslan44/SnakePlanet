import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import TutorialScreen from './src/screens/TutorialScreen';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StatsScreen from './src/screens/StatsScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import { getTutorialCompleted, getSettings, getStats } from './src/utils/StorageManager';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState('forest');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const tutorialDone = await getTutorialCompleted();
    const settings = await getSettings();
    const statsData = await getStats();

    setTutorialCompleted(tutorialDone);
    setSelectedSkin(settings?.selectedSkin || 'forest');
    setStats(statsData);

    // Skip intro - go directly to home or tutorial
    if (tutorialDone) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('tutorial');
    }
  };

  const handleTutorialComplete = () => {
    setTutorialCompleted(true);
    setCurrentScreen('home');
  };

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleBackToHome = async () => {
    const statsData = await getStats();
    setStats(statsData);
    setCurrentScreen('home');
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  const handleOpenStats = () => {
    setCurrentScreen('stats');
  };

  const handleOpenAchievements = () => {
    setCurrentScreen('achievements');
  };

  const handleSkinChange = (skinId) => {
    setSelectedSkin(skinId);
  };

  // Loading state
  if (currentScreen === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'tutorial' && (
        <TutorialScreen onComplete={handleTutorialComplete} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen
          onStartGame={handleStartGame}
          onOpenSettings={handleOpenSettings}
          onOpenStats={handleOpenStats}
          onOpenAchievements={handleOpenAchievements}
          stats={stats}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen
          onBackToHome={handleBackToHome}
          highScore={stats?.bestScore ?? 0}
          updateHighScore={async (s) => { const st = await getStats(); setStats(st); }}
          selectedSkin={selectedSkin}
        />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen
          onBack={handleBackToHome}
          onSkinChange={handleSkinChange}
          currentSkin={selectedSkin}
        />
      )}
      {currentScreen === 'stats' && (
        <StatsScreen onBack={handleBackToHome} />
      )}
      {currentScreen === 'achievements' && (
        <AchievementsScreen onBack={handleBackToHome} />
      )}
    </View>
  );
}

function LoadingScreen() {
  const pulse = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.95, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.container, styles.loadingCenter]}>
      <Animated.View style={{ opacity: fade, transform: [{ scale: pulse }] }}>
        <Text style={styles.loadingEmoji}>🐍</Text>
        <Text style={styles.loadingTitle}>SLITHER PLANET</Text>
        <Text style={styles.loadingSub}>Yükleniyor...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1a12',
  },
  loadingCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingEmoji: { fontSize: 64, textAlign: 'center', marginBottom: 8 },
  loadingTitle: { fontSize: 22, fontWeight: 'bold', color: '#8bc34a', letterSpacing: 4, textAlign: 'center' },
  loadingSub: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, textAlign: 'center' },
});
