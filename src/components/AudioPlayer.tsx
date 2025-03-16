import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-4 bg-black/20 backdrop-blur-lg rounded-full px-4 py-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 accent-white"
      />
      <audio
        ref={audioRef}
        src="https://github.com/rkazula/aiautomationdays/blob/master/assets/AIAutomationDays2025.mp3"
        loop
      />
    </div>
  );
};