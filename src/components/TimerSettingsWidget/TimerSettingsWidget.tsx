import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import Modal from '../Modal/Modal';
import SelectInput from '../SelectInput/SelectInput';

const TimerSettingsWidget = () => {
  const { isSettingsVisible } = useAppSelector((state) => state.widgets);
  const { workPeriodInMinutes } = useAppSelector((state) => state.timerSettings);
  const { setIsSettingsVisible, setWorkPeriod } = useActions();

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
        </div>
      </div>
    </Modal>
  );
};

export default TimerSettingsWidget;
