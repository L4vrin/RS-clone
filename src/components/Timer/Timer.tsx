import styles from './Timer.module.scss';
import React, { useEffect, useState } from 'react';
import getPadTime from './helpers/getPadTime';

const TIMER_RADIUS = 38.2;

interface TimerProps {
  duration: number; // duration in seconds
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;
  const dashoffset = -((TIMER_RADIUS * 2 * Math.PI * (duration - timeLeft)) / duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setTimeLeft((timeLeft) => (timeLeft >= 0.1 ? timeLeft - 0.1 : 0));
    }, 100);

    if (timeLeft === 0) setIsRunning(false);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, isRunning]);

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(duration);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  return (
    <div className={styles.timer}>
      <div className={styles.dial}>
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle className={styles.circleStatic} cx="40" cy="40" r="38.2" strokeDasharray="1" />
          <circle
            className={styles.circleActive}
            cx="40"
            cy="40"
            r="38.2"
            strokeDasharray="240"
            strokeDashoffset={String(dashoffset)}
          />
          <text className={styles.time} x="20" y="45.5" fontSize="16px">
            {getPadTime(minutes)}:{getPadTime(seconds)}
          </text>
        </svg>
      </div>
      <div>
        {isRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
