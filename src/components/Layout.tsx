import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.layoutContainer}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
