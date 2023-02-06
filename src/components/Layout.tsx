import { Link, Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Timer from './Timer';
const Layout = () => {
  return (
    <>
      {/* <Header /> */}

      <Outlet />
      <Timer duration={60} />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
