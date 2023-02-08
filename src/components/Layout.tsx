import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Timer from './Timer';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Timer />
      <Footer />
    </>
  );
};

export default Layout;
