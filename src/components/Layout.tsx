import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Navbar/Navbar';
import Timer from './Timer';

const Layout = () => {
  return (
    <>
      <Header />

      <main
        style={{
          display: 'flex',
          gap: '30px',
        }}
      >
        <Sidebar />
        <Outlet />
      </main>
      <Timer />
      <Footer />
    </>
  );
};

export default Layout;
