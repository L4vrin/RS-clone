import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Timer from './Timer';
import TimerSettingsWidget from './TimerSettingsWidget/TimerSettingsWidget';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Timer />
      <TimerSettingsWidget />
      <Footer />
    </>
  );
};

export default Layout;
