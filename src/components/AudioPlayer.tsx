import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AudioPlayer = () => {
  const [volume, setVolume] = useState(0.5);
  const { sound, isPlaying, togglePlay } = useAudio();

  useEffect(() => {
    sound.volume(volume);
  }, [volume, sound]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 sm:space-x-4 bg-black/20 backdrop-blur-lg rounded-full px-3 sm:px-4 py-2">
      <button
        onClick={togglePlay}
        className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        {isPlaying ? <VolumeX size={18} className="sm:w-5 sm:h-5" /> : <Volume2 size={18} className="sm:w-5 sm:h-5" />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-16 sm:w-24 accent-white"
      />
    </div>
  );
};