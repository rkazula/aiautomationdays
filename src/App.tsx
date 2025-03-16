import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpaceCat } from './components/SpaceCat';
import { Timer } from './components/Timer';
import { AudioPlayer } from './components/AudioPlayer';
import { Settings } from './components/Settings';
import { AudioProvider } from './context/AudioContext';
import { SpaceBackground } from './components/SpaceBackground';

function App() {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('timerSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      title: 'AI & Automation Days 2025',
      subtitle: 'Za chwilę zaczynamy prezentację!',
      defaultTime: '5:00',
      timerText: 'Countdown to Launch'
    };
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-navy-950 via-carbon-900 to-carbon-950 text-white overflow-hidden">
        <SpaceBackground />

        <Settings
          title={settings.title}
          subtitle={settings.subtitle}
          defaultTime={settings.defaultTime}
          timerText={settings.timerText}
          onSettingsChange={setSettings}
        />

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {settings.title}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {settings.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-12"
          >
            <SpaceCat />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="glass-panel p-12 rounded-2xl backdrop-blur-lg bg-white/5 w-[900px]"
          >
            <h3 className="text-2xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              {settings.timerText}
            </h3>
            <Timer defaultTime={settings.defaultTime} />
          </motion.div>
        </div>

        <AudioPlayer />
      </div>
    </AudioProvider>
  );
}

export default App;