import React, { useEffect, useState } from 'react';
import styles from './Timer.module.scss';
import getPadTime from './helpers/getPadTime';
import useAppSelector from '../../hooks/useAppSelector';

const TIMER_RADIUS = 38.2;

const Timer: React.FC = () => {
  const { workPeriodInMinutes, breakPeriodInMinutes } = useAppSelector(
    (store) => store.timerSettings
  );

  const [mode, setMode] = useState('work'); // work | break
  const [totalSeconds, setTotalSeconds] = useState(workPeriodInMinutes * 60);

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setSecondsLeft((prev) => (prev >= 0.1 ? prev - 0.1 : 0));
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
          <button type="button" onClick={handlePause}>
            Pause
          </button>
        ) : (
          <>
            <button type="button" onClick={handleStart}>
              Start
            </button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
