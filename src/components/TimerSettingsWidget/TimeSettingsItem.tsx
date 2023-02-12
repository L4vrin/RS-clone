import { FC } from 'react';
import NumberInput from '../NumberInput/NumberInput';
import styles from './timerSettings.module.scss';
import timerSettings from './timerSettingsConstants';

interface TimeSettingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const TimeSettingsItem: FC<TimeSettingProps> = ({ label, value, onChange }) => {
  return (
    <div className={styles.timeSettingsItem}>
      <p className={styles.numberLabel}>{label}</p>
      <NumberInput
        value={value}
        min={timerSettings.minTimeInMinutes}
        max={timerSettings.maxTimeInMinutes}
        onChange={onChange}
      />
    </div>
  );
};

export default TimeSettingsItem;
