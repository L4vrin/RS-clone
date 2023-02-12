import { AiOutlineClose } from 'react-icons/ai';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import Modal from '../Modal';
import NumberInput from '../ui/NumberInput';
import ToggleButton from '../ui/ToggleButton';
import timerSettings from './timerSettingsConstants';
import TimeSettingsItem from './TimeSettingsItem';
import styles from './timerSettings.module.scss';

const TimerSettingsWidget = () => {
  const { isSettingsVisible } = useAppSelector((state) => state.widgets);
  const {
    workPeriodInMinutes,
    shortBreakPeriodInMinutes,
    longBreakPeriodInMinutes,
    longBreakInterval,
    autoRunWork,
    autoRunBreak,
    offBreak,
  } = useAppSelector((state) => state.timerSettings);
  const { setIsSettingsVisible, setTimerSettings } = useActions();

  return (
    <Modal isVisible={isSettingsVisible} setIsVisible={setIsSettingsVisible}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Timer Settings</h3>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close"
            onClick={() => setIsSettingsVisible(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className={`${styles.row} ${styles.rowFlexColumn}`}>
          <p className={styles.label}>Time (minutes)</p>
          <div className={styles.timeSettings}>
            <TimeSettingsItem
              label="Pomodoro"
              value={workPeriodInMinutes}
              onChange={(value) => setTimerSettings({ workPeriodInMinutes: value })}
            />
            <TimeSettingsItem
              label="Short Break"
              value={shortBreakPeriodInMinutes}
              onChange={(value) => setTimerSettings({ shortBreakPeriodInMinutes: value })}
            />
            <TimeSettingsItem
              label="Long Break"
              value={longBreakPeriodInMinutes}
              onChange={(value) => setTimerSettings({ longBreakPeriodInMinutes: value })}
            />
          </div>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>Auto start Breaks?</p>
          <ToggleButton
            checked={autoRunWork}
            onChange={(value) => setTimerSettings({ autoRunWork: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Auto start Pomodoros?</p>
          <ToggleButton
            checked={autoRunBreak}
            onChange={(value) => setTimerSettings({ autoRunBreak: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Disable Break?</p>
          <ToggleButton
            checked={offBreak}
            onChange={(value) => setTimerSettings({ offBreak: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Long Break interval</p>
          <div className={styles.numberContainer}>
            <NumberInput
              min={timerSettings.minLongBreakInterval}
              max={timerSettings.maxLongBreakInterval}
              value={longBreakInterval}
              onChange={(value) => setTimerSettings({ longBreakInterval: value })}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimerSettingsWidget;
