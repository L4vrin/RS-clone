// import { useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import styles from './Header.module.scss';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  // const [isLogin, setIsLogin] = useState(false)
  const isLogin = localStorage.getItem('user');

  const handlerLogoff = () => {
    localStorage.removeItem('user')
  }
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        {/* <nav className={styles.nav}>
        <Link to="/">First Page</Link>
        <Link to="/second">Second Page</Link>
        <Link to="/third">Third Page</Link>
      </nav> */}
        {}
        <div className={styles.userContainer}>
          {isLogin ? user.fullName : 'Guest'}
        </div>
        <div className={styles.buttonsContainer}>
          {isLogin && (
            <button className={styles.button} type="button" onClick = {() => handlerLogoff()}>
              Logoff
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
