import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <nav className={styles.nav}>
        <Link to="/">First Page</Link>
        <Link to="/second">Second Page</Link>
        <Link to="/third">Third Page</Link>
      </nav>
    </div>
  );
};

export default Header;
