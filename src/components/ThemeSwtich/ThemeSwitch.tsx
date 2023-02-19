import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import ToggleButton from '../ui/ToggleButton';
import styles from './ThemeSwitch.module.scss';

const ThemeSwitch = () => {
  const { isDarkTheme } = useAppSelector((state) => state.preferences);
  const { toggleTheme } = useActions();
  document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
  return (
    <div className={styles.themeSwitchWrapper}>
      <ToggleButton
        checked={isDarkTheme}
        onChange={(value) => {
          toggleTheme(value);
        }}
      />
    </div>
  );
};

export default ThemeSwitch;
