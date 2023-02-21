import { useEffect, useRef, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import {
  BsGearFill,
  BsPauseCircle,
  BsPlayCircle,
  BsSkipEndCircle,
  BsStopCircle,
} from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Timer.module.scss';
import getPadTime from './helpers/getPadTime';
import useAppSelector from '../../hooks/useAppSelector';
import useActions from '../../hooks/useActions';
import { useUpdateTodoMutation } from '../../store/tasks/tasksApi';
import { alarmSounds, ambientSounds } from '../../constants/timerSettings';

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
    alarmSound,
    ambientSound,
  } = useAppSelector((store) => store.timerSettings);

  const { currentTask, isRunning } = useAppSelector((store) => store.timer);
  const { setIsRunning, setIsSettingsVisible, removeTaskFromTimer } = useActions();
  const [updateTodo] = useUpdateTodoMutation();
  const [currentMode, setCurrentMode] = useState(MODES.work);
  const totalSeconds = useRef(workPeriodInMinutes * 60);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds.current);
  const interval = useInterval(() => setSecondsLeft((s) => s - 1), 1000);
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
    updatePeriod(MODES.work);
    setSecondsLeft(workPeriodInMinutes * 60);
    pomodoroCount.current = 0;
  };

  useEffect(() => {
    return () => {
      ambientAudio.current.pause();
      reset();
    };
  }, []);

  useEffect(() => {
    if (alarmSound) {
      alarmAudio.current.src = alarmSounds[alarmSound].path;
    }
  }, [alarmSound]);

  useEffect(() => {
    if (ambientSound) {
      ambientAudio.current.src = ambientSounds[ambientSound].path;
      ambientAudio.current.loop = true;
      if (isRunning) ambientAudio.current.play();
    } else {
      ambientAudio.current.pause();
    }
  }, [ambientSound]);

  useEffect(() => {
    if (isRunning && ambientSound) {
      ambientAudio.current.play();
    } else {
      ambientAudio.current.pause();
    }

    if (isRunning) interval.start();
    return interval.stop();
  }, [isRunning]);

  const switchMode = () => {
    let nextMode = currentMode;

    if (!offBreak) {
      nextMode = currentMode === MODES.work ? MODES.break : MODES.work;
    } else {
      nextMode = MODES.work;
    }

    setCurrentMode(nextMode);

    if (!autoRunWork && nextMode === MODES.work) setIsRunning(false);
    if (!autoRunBreak && nextMode === MODES.break) setIsRunning(false);
    updatePeriod(nextMode);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      if (alarmSound) alarmAudio.current.play();
      if (currentMode === MODES.work && currentTask)
        updateTodo({
          ...currentTask,
          completedPomodors: currentTask.completedPomodors + 1,
        });

      switchMode();
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
      {currentTask && (
        <div className={styles.task}>
          <span>{currentTask.title}</span>
          <button
            type="button"
            className={styles.removeTaskButton}
            onClick={() => removeTaskFromTimer(currentTask._id)}
          >
            <AiOutlineClose />
          </button>
        </div>
      )}

      <div className={styles.controls}>
        {isRunning ? (
          <div>
            {currentMode === MODES.work ? (
              <button
                className={styles.timerButton}
                type="button"
                aria-label="Pause timer"
                onClick={pause}
              >
                <BsPauseCircle />
              </button>
            ) : (
              <button
                className={styles.timerButton}
                type="button"
                aria-label="Skip pause"
                onClick={switchMode}
              >
                <BsSkipEndCircle />
              </button>
            )}
          </div>
        ) : (
          <>
            <button
              className={styles.timerButton}
              type="button"
              aria-label="Start timer"
              onClick={start}
            >
              <BsPlayCircle />
            </button>
            <button
              className={styles.timerButton}
              type="button"
              aria-label="Reset timer"
              onClick={reset}
            >
              <BsStopCircle />
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
