import { BiPauseCircle, BiPlayCircle, BiStopCircle } from 'react-icons/bi';
import { BsGearFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.scss';
import getPadTime from './helpers/getPadTime';
import useAppSelector from '../../hooks/useAppSelector';
import useActions from '../../hooks/useActions';
import { useUpdateTodoMutation } from '../../store/tasks/tasksApi';

const TIMER_RADIUS = 38.2;

const MODES = {
  work: 'work',
  break: 'break',
};

const Timer = () => {
  const {
    workPeriodInMinutes,
    shortBreakPeriodInMinutes,
    autoRunWork,
    autoRunBreak,
    offBreak,
    longBreakPeriodInMinutes,
    longBreakInterval,
    alarmSoundPath,
    ambientSoundPath,
  } = useAppSelector((store) => store.timerSettings);

  const { currentTask, isRunning } = useAppSelector((store) => store.timer);
  const { setCompletedPomodoro, setIsRunning, setIsSettingsVisible } = useActions();
  const [updateTodo] = useUpdateTodoMutation();
  const [currentMode, setCurrentMode] = useState(MODES.work);
  const totalSeconds = useRef(workPeriodInMinutes * 60);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds.current);
  const pomodoroCount = useRef(0);

  const alarmAudio = useRef(new Audio());
  const ambientAudio = useRef(new Audio());

  const updatePeriod = (mode: string) => {
    switch (mode) {
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

  const start = () => {
    if (secondsLeft === 0) setSecondsLeft(totalSeconds.current);
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentMode(MODES.work);
    pomodoroCount.current = 0;
    setSecondsLeft(workPeriodInMinutes * 60);
  };

  useEffect(() => {
    if (alarmSoundPath) alarmAudio.current = new Audio(alarmSoundPath);

    return () => {
      ambientAudio.current.pause();
      reset();
    };
  }, []);

  useEffect(() => {
    if (alarmSoundPath) {
      alarmAudio.current.src = alarmSoundPath;
    }
  }, [alarmSoundPath]);

  useEffect(() => {
    if (ambientSoundPath) {
      ambientAudio.current.src = ambientSoundPath;
      ambientAudio.current.loop = true;
      if (isRunning) ambientAudio.current.play();
    } else {
      ambientAudio.current.pause();
    }
  }, [ambientSoundPath]);

  useEffect(() => {
    if (isRunning && ambientSoundPath) {
      ambientAudio.current.play();
    } else {
      ambientAudio.current.pause();
    }

    const interval = setInterval(() => {
      if (isRunning) setSecondsLeft((prev) => (prev >= 0.1 ? prev - 0.1 : 0));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      if (alarmSoundPath) alarmAudio.current.play();
      let nextMode = currentMode;

      if (!offBreak) {
        nextMode = currentMode === MODES.work ? MODES.break : MODES.work;
      } else {
        nextMode = MODES.work;
      }

      setCurrentMode(nextMode);

      if (!autoRunWork && nextMode === MODES.work) setIsRunning(false);
      if (!autoRunBreak && nextMode === MODES.break) setIsRunning(false);
      if (currentMode === MODES.work && currentTask)
        updateTodo({
          ...currentTask,
          completedPomodors: currentTask.completedPomodors + 1,
        });
      updatePeriod(nextMode);

      if (currentTask && currentMode === MODES.work) setCompletedPomodoro(currentTask._id);
    }
  }, [secondsLeft, autoRunWork, autoRunBreak, offBreak]);

  useEffect(() => {
    updatePeriod(currentMode);
  }, [workPeriodInMinutes, shortBreakPeriodInMinutes, longBreakPeriodInMinutes]);

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
              currentMode === MODES.break ? styles.circleActiveBreak : ''
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
      <div className={styles.controls}>
        {isRunning ? (
          <button
            className={styles.timerButton}
            type="button"
            aria-label="Pause timer"
            onClick={pause}
          >
            <BiPauseCircle />
          </button>
        ) : (
          <>
            <button
              className={styles.timerButton}
              type="button"
              aria-label="Start timer"
              onClick={start}
            >
              <BiPlayCircle />
            </button>
            <button
              className={styles.timerButton}
              type="button"
              aria-label="Stop timer"
              onClick={reset}
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
