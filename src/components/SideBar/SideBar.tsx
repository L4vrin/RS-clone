import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import DEADLINES from '../../constants/deadlines';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const { t } = useTranslation();
  return (
    <ul>
      <li className={styles.item}>
        <NavLink to={DEADLINES.today} className={styles.link}>
          { t("Today")}
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.tomorrow} className={styles.link}>
        { t("Tomorrow")}
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.week} className={styles.link}>
        { t("ThisWeek")}
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.month} className={styles.link}>
        { t("ThisMonth")}
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.year} className={styles.link}>
        { t("ThisYear")}
        </NavLink>
      </li>
      <li>
        <NavLink to={DEADLINES.all} className={styles.link}>
        { t("AllTime")}
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;
