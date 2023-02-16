import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';

const SideBar = () => {
  return (
    <ul>
      <li className={styles.item}>
        <NavLink to="" className={styles.link}>
          Today
        </NavLink>
      </li>
      <li>
        <NavLink to="tomorrow" className={styles.link}>
          Tomorrow
        </NavLink>
      </li>
      <li>
        <NavLink to="week" className={styles.link}>
          End Week
        </NavLink>
      </li>
      <li>
        <NavLink to="7days" className={styles.link}>
          7 days
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;
