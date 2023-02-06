import styles from './Timer.module.scss';
import React, { useEffect, useState } from 'react';
import getPadTime from './helpers/getPadTime';

const TIMER_RADIUS = 38.2;

interface TimerProps {
  duration: number; // duration in seconds
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTicking, setIsTicking] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;
  const dashoffset = -((TIMER_RADIUS * 2 * Math.PI * (duration - timeLeft)) / duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTicking) setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);

    if (timeLeft === 0) setIsTicking(false);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, isTicking]);

  const startHandler = () => {
    if (timeLeft === 0) setTimeLeft(duration);
    setIsTicking(true);
  };

  const pauseHandler = () => {
    setIsTicking(false);
  };

  const resetHandler = () => {
    setIsTicking(false);
    setTimeLeft(duration);
  };

  return (
    <div className={styles.timer}>
      <div className={styles.dial}>
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle className={styles.circleStatic} cx="40" cy="40" r="38.2" />
          <circle
            className={styles.circleActive}
            cx="40"
            cy="40"
            r="38.2"
            strokeDashoffset={String(dashoffset)}
          />
          <text className={styles.time} x="20" y="45.5">
            {getPadTime(minutes)}:{getPadTime(seconds)}
          </text>
        </svg>
      </div>
      <div>
        {isTicking ? (
          <button onClick={pauseHandler}>Pause</button>
        ) : (
          <>
            <button onClick={startHandler}>Start</button>
            <button onClick={resetHandler}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
