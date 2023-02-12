import {useNavigate} from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import styles from './Header.module.scss';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const isLogin = localStorage.getItem('user');
  const navigate = useNavigate();
  const {changeUserName, switchRegistred} = useActions();
  const handlerLogoff = () => {
    changeUserName('Guest');
    switchRegistred(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  const handlerLogin = () => {
    switchRegistred(true);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.userContainer}>
          {isLogin ? user.fullName : 'Guest'}
        </div>
        <div className={styles.buttonsContainer}>
          {isLogin ? (
            <button
              className={styles.button}
              type="button"
              onClick={() => handlerLogoff()}
            >
              Logoff
            </button>
          ) : (
            <button
              className={styles.button}
              type="button"
              onClick={() => handlerLogin()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
