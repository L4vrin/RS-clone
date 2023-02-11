import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import Modal from '../Modal/Modal';
import SelectInput from '../SelectInput/SelectInput';
import Toggle from '../Switch';

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
  const { setIsSettingsVisible, setWorkPeriod, setShortBreakPeriod, setTimerSettings } =
    useActions();

  const timeOptions = Array(120)
    .fill(null)
    .map((_, idx) => ({ value: idx + 1, name: `${idx + 1} Minutes` }));

  return (
    <Modal isVisible={isSettingsVisible} setIsVisible={setIsSettingsVisible}>
      <div>
        <h3>Settings</h3>
        <div>
          <div>
            <p>Pomodoro duration</p>
            <SelectInput
              options={timeOptions}
              value={workPeriodInMinutes}
              onChange={setWorkPeriod}
            />
          </div>
          <div>
            <p>Short break</p>
            <input
              type="number"
              min={1}
              value={shortBreakPeriodInMinutes}
              onChange={(evt) => setShortBreakPeriod(evt.target.value)}
            />
          </div>
          <div>
            <p>Long break</p>
            <input
              type="number"
              min={1}
              value={longBreakPeriodInMinutes}
              onChange={(evt) =>
                setTimerSettings({ longBreakPeriodInMinutes: Number(evt.target.value) })
              }
            />
          </div>
          <div>
            <p>Long break interval</p>
            <input
              type="number"
              min={1}
              value={longBreakInterval}
              onChange={(evt) => setTimerSettings({ longBreakInterval: Number(evt.target.value) })}
            />
          </div>
        </div>
        <div>
          <div>
            <p>Auto run pomodoro</p>
            <Toggle
              checked={autoRunWork}
              onChange={(evt) => setTimerSettings({ autoRunWork: evt.target.checked })}
            />
          </div>
          <div>
            <p>Auto run break</p>
            <Toggle
              checked={autoRunBreak}
              onChange={(evt) => setTimerSettings({ autoRunBreak: evt.target.checked })}
            />
          </div>
          <div>
            <p>Disable break</p>
            <Toggle
              checked={offBreak}
              onChange={(evt) => setTimerSettings({ offBreak: evt.target.checked })}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimerSettingsWidget;
