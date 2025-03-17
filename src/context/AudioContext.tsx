import { createContext, useContext, useState } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  sound: Howl;
  isPlaying: boolean;
  togglePlay: () => void;
  stopMusic: () => void;
  playRocketSound: () => void;
}

const backgroundMusic = new Howl({
  src: ['https://raw.githubusercontent.com/rkazula/aiautomationdays/master/assets/AIAutomationDays2025.mp3'],
  volume: 0.5,
  loop: true,
  html5: true
});

const rocketSound = new Howl({
  src: ['https://raw.githubusercontent.com/rkazula/aiautomationdays/master/assets/rocket_sound.mp3'],
  volume: 0.7,
  html5: true
});

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopMusic = () => {
    backgroundMusic.pause();
    setIsPlaying(false);
  };

  const playRocketSound = () => {
    rocketSound.play();
  };

  return (
    <AudioContext.Provider value={{
      sound: backgroundMusic,
      isPlaying,
      togglePlay,
      stopMusic,
      playRocketSound
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};