import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import styles from './Header.module.scss';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const isLogin = localStorage.getItem('user');
  const navigate = useNavigate();
  const { changeUserName, switchRegistred } = useActions();
  const { t, i18n } = useTranslation();
  
  const handlerLogoff = () => {
    changeUserName('Guest');
    switchRegistred(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/');
  };

  const changeLanguage = (language:any) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.userContainer}>
          {isLogin ? user.fullName : 'Guest'}
        </div>
        <div className={styles.buttonsContainer}>
          {isLogin && (
            <button
              className={styles.button}
              type="button"
              onClick={() => handlerLogoff()}
            >
              Logoff
            </button>
          )}
        </div>
        <div>{t("title")}</div>
        <div>
          <button type="button" onClick={() => changeLanguage('en')}>En</button>
          <button type="button" onClick={() => changeLanguage('ru')}>Ru</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
