import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

// import Today from './pages/Today';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<RegistrationPage />} />
      <Route path="login" element={<LoginPage />} />
        {/* <Route index element={<Today />} /> */}
        {/* <Route path="tomorrow" element={<Tomorrow />} />
        <Route path="week" element={<Week />} />
        <Route path="*" element={<Notfound />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
