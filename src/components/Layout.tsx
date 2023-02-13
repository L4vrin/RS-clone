import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Timer from './Timer';
import TimerSettingsWidget from './TimerSettingsWidget/TimerSettingsWidget';
import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <>
      <Header/>
      <div className={styles.layoutContainer}>
      <Outlet />
      <Timer />
      <TimerSettingsWidget />
      <Footer />
    </>
  );
};

export default Layout;
