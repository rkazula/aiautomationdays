import { createContext, useContext, useState } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  sound: Howl;
  isPlaying: boolean;
  togglePlay: () => void;
}

const sound = new Howl({
  src: ['https://raw.githubusercontent.com/rkazula/aiautomationdays/master/assets/AIAutomationDays2025.mp3'],
  volume: 0.5,
  loop: true,
  html5: true
});

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ sound, isPlaying, togglePlay }}>
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