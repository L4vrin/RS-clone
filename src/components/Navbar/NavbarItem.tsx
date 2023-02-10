import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const NavbarItem = (
  icon: JSX.Element,
  tasksCount: number,
  timeLeft?: string
): JSX.Element => {
  return (
    <li className={styles.basicListItem}>
      <Link className={styles.navbarLink} to="/today">
        <>
          {icon}
          <span>Today</span>
          <span>{tasksCount || null}</span>
          <span>{timeLeft || null}</span>
        </>
      </Link>
    </li>
  );
};

export default NavbarItem;
