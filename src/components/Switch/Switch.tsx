import { InputHTMLAttributes } from 'react';
import styles from './switch.module.scss';

const Switch = ({ checked, onChange }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default Switch;
