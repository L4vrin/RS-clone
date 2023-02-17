import { NavLink } from 'react-router-dom';
import DEADLINES from '../../constants/deadlines';
import styles from './SideBar.module.scss';

const SideBar = () => {
  return (
    <ul>
      <li className={styles.item}>
        <NavLink to={DEADLINES.today} className={styles.link}>
          Today
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.tomorrow} className={styles.link}>
          Tomorrow
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.week} className={styles.link}>
          This Week
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.month} className={styles.link}>
          This Month
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.year} className={styles.link}>
          This Year
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.all} className={styles.link}>
          All
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;
