import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface TimerProps {
  defaultTime: string;
}

export const Timer = ({ defaultTime }: TimerProps) => {
  const [time, setTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const { togglePlay, isPlaying } = useAudio();

  useEffect(() => {
    const newTime = parseTimeInput(defaultTime);
    if (!isNaN(newTime)) {
      setTime(newTime);
    }
  }, [defaultTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTimeInput = (input: string) => {
    const [mins, secs] = input.split(':').map(Number);
    return (mins * 60) + (secs || 0);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    togglePlay();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(parseTimeInput(defaultTime));
  };

  useEffect(() => {
    let interval: number;
    
    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            window.dispatchEvent(new Event('timerComplete'));
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-[360px] font-bold font-mono leading-none tracking-tighter">
        {formatTime(time)}
      </div>
      <div className="flex space-x-6">
        <button
          onClick={toggleTimer}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <RotateCcw size={32} />
        </button>
      </div>
    </div>
  );
};