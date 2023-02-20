import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import ThemeSwitch from '../ThemeSwtich/ThemeSwitch';
import ChangeLangBtn from '../ui/ChangeLangBtn';
import styles from './Header.module.scss';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const isLogin = localStorage.getItem('user');

  const navigate = useNavigate();
  const { changeUserName, switchRegistred } = useActions();
  const { t } = useTranslation();

  const handlerLogoff = () => {
    changeUserName('Guest');
    switchRegistred(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.userContainer}>{isLogin ? user.fullName : 'Guest'}</div>
        <div className={styles.buttonsContainer}>
          <ChangeLangBtn />
          <ThemeSwitch />
          {isLogin && (
            <button className={styles.button} type="button" onClick={() => handlerLogoff()}>
              {t('Logoff')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
