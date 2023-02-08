import styles from './Timer.module.scss';
import React, { useEffect, useState } from 'react';
import getPadTime from './helpers/getPadTime';
import useAppSelector from '../../hooks/useAppSelector';

const TIMER_RADIUS = 38.2;

interface TimerProps {
  duration: number; // duration in seconds
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const { workPeriodInMinutes, breakPeriodInMinutes } = useAppSelector(
    (store) => store.timerSettings
  );

  const getTotalSeconds = () =>
    mode === 'work' ? workPeriodInMinutes * 60 : breakPeriodInMinutes * 60;

  const [mode, setMode] = useState('work'); // work | break
  const [totalSeconds, setTotalSeconds] = useState(getTotalSeconds);

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setSecondsLeft((secondsLeft) => (secondsLeft >= 0.1 ? secondsLeft - 0.1 : 0));
    }, 100);

    if (secondsLeft === 0) {
      // setIsRunning(false);
      setMode('break');
      setSecondsLeft(totalSeconds);
      setTotalSeconds(mode === 'work' ? workPeriodInMinutes * 60 : breakPeriodInMinutes * 60);
    }

    return () => {
      clearInterval(interval);
    };
  }, [secondsLeft, isRunning, mode, totalSeconds]);

  const handleStart = () => {
    if (secondsLeft === 0) setSecondsLeft(totalSeconds);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setSecondsLeft(totalSeconds);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft - minutes * 60;
  const dashoffset = -((TIMER_RADIUS * 2 * Math.PI * (totalSeconds - secondsLeft)) / totalSeconds);

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
