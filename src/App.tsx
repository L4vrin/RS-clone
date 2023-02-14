import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Notfound from './pages/Notfound';
import RegistrationPage from './pages/RegistrationPage';
import Today from './pages/Today';
import WelcomePage from './pages/WelcomePage';

// import Today from './pages/Today';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="welcome" element={<WelcomePage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<RegistrationPage />} />
        <Route path="today" element={<Today />} />
        {/* <Route index element={<Today />} /> */}
        {
          /* <Route path="tomorrow" element={<Tomorrow />} />
        <Route path="week" element={<Week />} /> */
          <Route path="*" element={<Notfound />} />
        }
      </Route>
    </Routes>
  );
};

export default App;
