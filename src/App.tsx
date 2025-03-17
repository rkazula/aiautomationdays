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
      timerText: 'Za chwilę zaczynamy kolejną prezentację:'
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

        <div className="relative z-10 w-[50%] mx-auto min-h-screen flex flex-col items-center justify-between py-[5vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 whitespace-nowrap">
              {settings.title}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-base md:text-lg text-gray-300 mt-4"
            >
              {settings.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-[min(22vw,22vh)] aspect-square mb-4"
          >
            <SpaceCat />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="glass-panel p-[3vh] rounded-2xl backdrop-blur-lg bg-white/5 w-full -mt-[25%]"
            style={{ height: 'min(45vh, 70vw)' }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-center mb-[1vh] bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
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