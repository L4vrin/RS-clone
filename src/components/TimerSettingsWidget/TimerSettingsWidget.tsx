import { AiOutlineClose } from 'react-icons/ai';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import Modal from '../Modal';
import NumberInput from '../ui/NumberInput';
import ToggleButton from '../ui/ToggleButton';
import TimeSettingsItem from './TimeSettingsItem';
import styles from './timerSettings.module.scss';
import {
  minLongBreakInterval,
  maxLongBreakInterval,
  alarmSounds,
  ambientSounds,
} from '../../settings/timerSettings';

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
    alarmSoundPath,
    ambientSoundPath,
  } = useAppSelector((state) => state.timerSettings);
  const { setIsSettingsVisible, setTimerSettings } = useActions();

  const alarmSoundOptions = [{ path: '', name: 'None' }, ...alarmSounds];
  const ambientSoundOptions = [{ path: '', name: 'None' }, ...ambientSounds];

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
              onChange={(value) =>
                setTimerSettings({ workPeriodInMinutes: value })
              }
            />
            <TimeSettingsItem
              label="Short Break"
              value={shortBreakPeriodInMinutes}
              onChange={(value) =>
                setTimerSettings({ shortBreakPeriodInMinutes: value })
              }
            />
            <TimeSettingsItem
              label="Long Break"
              value={longBreakPeriodInMinutes}
              onChange={(value) =>
                setTimerSettings({ longBreakPeriodInMinutes: value })
              }
            />
          </div>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>Auto start Pomodoros?</p>
          <ToggleButton
            checked={autoRunWork}
            onChange={(value) => setTimerSettings({ autoRunWork: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Auto start Breaks?</p>
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
              min={minLongBreakInterval}
              max={maxLongBreakInterval}
              value={longBreakInterval}
              onChange={(value) =>
                setTimerSettings({ longBreakInterval: value })
              }
            />
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Alarm Sound</p>
          <div className={styles.selectSoundContainer}>
            <select
              className={styles.selectSound}
              value={alarmSoundPath ?? ''}
              onChange={(evt) =>
                setTimerSettings({ alarmSoundPath: evt.target.value })
              }
            >
              {alarmSoundOptions.map((option) => (
                <option key={option.path} value={option.path}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Ambient Sound</p>
          <div className={styles.selectSoundContainer}>
            <select
              className={styles.selectSound}
              value={ambientSoundPath ?? ''}
              onChange={(evt) =>
                setTimerSettings({ ambientSoundPath: evt.target.value })
              }
            >
              {ambientSoundOptions.map((option) => (
                <option key={option.path} value={option.path}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimerSettingsWidget;
