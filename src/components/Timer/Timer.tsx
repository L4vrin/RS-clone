import { BiPauseCircle, BiPlayCircle, BiStopCircle } from 'react-icons/bi';
import { BsGearFill } from 'react-icons/bs';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.scss';
import getPadTime from './helpers/getPadTime';
import useAppSelector from '../../hooks/useAppSelector';
import useActions from '../../hooks/useActions';

const TIMER_RADIUS = 38.2;

const MODES = {
  work: 'work',
  break: 'break',
};

const Timer: React.FC = () => {
  const {
    workPeriodInMinutes,
    shortBreakPeriodInMinutes,
    autoRunWork,
    autoRunBreak,
    offBreak,
    longBreakPeriodInMinutes,
    longBreakInterval,
  } = useAppSelector((store) => store.timerSettings);

  const { currentTask, isRunning } = useAppSelector((store) => store.timer);
  const { setCompletedPomodoro, setIsRunning, setIsSettingsVisible } = useActions();

  const [mode, setMode] = useState(MODES.work);
  const totalSeconds = useRef(workPeriodInMinutes * 60);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds.current);
  const pomodoroCount = useRef(0);

  const updatePeriod = (newMode: string) => {
    switch (newMode) {
      case MODES.work:
        totalSeconds.current = workPeriodInMinutes * 60;
        break;
      case MODES.break:
        if (pomodoroCount.current === longBreakInterval) {
          totalSeconds.current = longBreakPeriodInMinutes * 60;
          pomodoroCount.current = 0;
        } else {
          totalSeconds.current = shortBreakPeriodInMinutes * 60;
        }
        break;
      default:
        break;
    }
    setSecondsLeft(totalSeconds.current);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) setSecondsLeft((prev) => (prev >= 0.1 ? prev - 0.1 : 0));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      let nextMode = mode;

      if (!offBreak) {
        nextMode = mode === MODES.work ? MODES.break : MODES.work;
        setMode(() => nextMode);
      }

      if (!autoRunWork && nextMode === MODES.work) setIsRunning(false);
      if (!autoRunBreak && nextMode === MODES.break) setIsRunning(false);
      if (mode === MODES.work) pomodoroCount.current += 1;
      updatePeriod(nextMode);

      if (currentTask && mode === MODES.work) setCompletedPomodoro(currentTask.id);
    }
  }, [secondsLeft]);

  useEffect(() => {
    updatePeriod(mode);
  }, [workPeriodInMinutes, shortBreakPeriodInMinutes, longBreakPeriodInMinutes]);

  const handleStart = () => {
    if (secondsLeft === 0) setSecondsLeft(totalSeconds.current);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode(MODES.work);
    setSecondsLeft(workPeriodInMinutes * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft - minutes * 60;
  const dashoffset = -(
    (TIMER_RADIUS * 2 * Math.PI * (totalSeconds.current - secondsLeft)) /
    totalSeconds.current
  );

  return (
    <div className={`${styles.timer} ${currentTask ? styles.timerWithTask : ''}`}>
      <div className={styles.dial}>
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle className={styles.circleStatic} cx="40" cy="40" r="38.2" strokeDasharray="1" />
          <circle
            className={`${styles.circleActive} ${
              mode === MODES.break ? styles.circleActiveBreak : ''
            }`}
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
      <div className={styles.task}>{currentTask && currentTask.title}</div>
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
      <button
        className={styles.settingsButton}
        type="button"
        aria-label="Open settings"
        onClick={() => setIsSettingsVisible(true)}
      >
        <BsGearFill />
      </button>
    </div>
  );
};

export default Timer;
