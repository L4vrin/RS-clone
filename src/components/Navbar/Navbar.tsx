import { NavLink } from 'react-router-dom';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { CgCalendarToday } from 'react-icons/cg';
import { BsCalendar3Week } from 'react-icons/bs';
import { BiCalendarCheck } from 'react-icons/bi';
// import NavbarItem from './NavbarItem';
import styles from './Navbar.module.scss';

const Sidebar = () => {
  const activeStyle = {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.188)',
  };
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.basicTaskLists}>
        <li className={styles.basicListItem}>
          <NavLink
            className={styles.navbarLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/today"
          >
            <MdOutlineCalendarToday />
            <span>Today</span>
          </NavLink>
        </li>
        <li className={styles.basicListItem}>
          <NavLink
            className={styles.navbarLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/tomorrow"
          >
            <CgCalendarToday />
            <span>Tomorrow</span>
          </NavLink>
        </li>
        <li className={styles.basicListItem}>
          <NavLink
            className={styles.navbarLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/this-week"
          >
            <BsCalendar3Week />
            <span>This week</span>
          </NavLink>
        </li>
        <li className={styles.basicListItem}>
          <NavLink
            className={styles.navbarLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/completed"
          >
            <BiCalendarCheck />
            <span>Completed</span>
          </NavLink>
        </li>

        {/* <NavbarItem icon={BiCalendarCheck} /> */}
      </ul>

      {/* <CustomLists /> */}
    </aside>
  );
};

export default Sidebar;
