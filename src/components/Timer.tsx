import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface TimerProps {
  defaultTime: string;
}

export const Timer = ({ defaultTime }: TimerProps) => {
  const [time, setTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const { togglePlay, isPlaying, stopMusic, playRocketSound } = useAudio();

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

  const handleTimerEnd = useCallback(() => {
    setIsRunning(false);
    stopMusic();
    playRocketSound();
    window.dispatchEvent(new Event('timerComplete'));
  }, [stopMusic, playRocketSound]);

  useEffect(() => {
    let interval: number;

    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, handleTimerEnd]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        className="w-full text-center"
        style={{
          fontSize: 'min(20vw, 20vh)',
          lineHeight: '0.85',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '-0.05em'
        }}
      >
        {formatTime(time)}
      </div>
      <div className="flex space-x-4 md:space-x-6 mt-4">
        <button
          onClick={toggleTimer}
          className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isRunning ?
            <Pause className="w-[min(5vw,28px)] h-[min(5vw,28px)]" /> :
            <Play className="w-[min(5vw,28px)] h-[min(5vw,28px)]" />
          }
        </button>
        <button
          onClick={resetTimer}
          className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <RotateCcw className="w-[min(5vw,28px)] h-[min(5vw,28px)]" />
        </button>
      </div>
    </div>
  );
};