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
        <div className="relative z-10 container mx-auto px-4 py-4 min-h-screen flex flex-col items-center justify-center gap-4 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 px-4">
              {settings.title}
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              {settings.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="scale-75 sm:scale-90 md:scale-100 transform-gpu"
          >
            <SpaceCat />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="glass-panel p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-lg bg-white/5 w-[95%] sm:w-[85%] md:w-[90%] lg:w-[1000px] max-w-[95vw] mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-center mb-2 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
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

export default App