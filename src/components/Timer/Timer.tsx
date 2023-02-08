import { BiPauseCircle, BiPlayCircle, BiStopCircle } from 'react-icons/bi';
import React, { useEffect, useRef, useState } from 'react';
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

  const modeRef = useRef(mode);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setSecondsLeft((prev) => (prev >= 0.1 ? prev - 0.1 : 0));
    }, 100);

    if (secondsLeft === 0) {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? workPeriodInMinutes : breakPeriodInMinutes) * 60;
      setMode(nextMode);
      modeRef.current = nextMode;
      setTotalSeconds(() => nextSeconds);
      setSecondsLeft(() => nextSeconds);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, secondsLeft, totalSeconds]);

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
    setSecondsLeft(workPeriodInMinutes * 60);
    setTotalSeconds(workPeriodInMinutes * 60);
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
            className={`${styles.circleActive} ${mode === 'break' ? styles.circleActiveBreak : ''}`}
            cx="40"
            cy="40"
            r="38.2"
            strokeDasharray="240"
            strokeDashoffset={String(dashoffset)}
          />
        </svg>
        <div className={styles.time}>
          {getPadTime(minutes)}:{getPadTime(seconds)}
        </div>
      </div>
      <div className={styles.buttons}>
        {isRunning ? (
          <button
            className={styles.timerButton}
            type="button"
            aria-label="Pause timer"
            onClick={handlePause}
          >
            <BiPauseCircle />
          </button>
        ) : (
          <>
            <button
              className={styles.timerButton}
              type="button"
              aria-label="Start timer"
              onClick={handleStart}
            >
              <BiPlayCircle />
            </button>
            <button
              className={styles.timerButton}
              type="button"
              aria-label="Stop timer"
              onClick={handleReset}
            >
              <BiStopCircle />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
