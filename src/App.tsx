import { Routes, Route, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import Layout from './components/Layout';
import Notfound from './pages/Notfound';
import RegistrationPage from './pages/RegistrationPage';
import Today from './pages/Today';
// import Today from './pages/Today';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')) {
     navigate('today')
    }
  },[navigate])
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<RegistrationPage />} />
      <Route path="today" element={<Today />} />
        {/* <Route index element={<Today />} /> */}
        {/* <Route path="tomorrow" element={<Tomorrow />} />
        <Route path="week" element={<Week />} /> */ 
        <Route path="*" element={<Notfound />} />}
      </Route>
    </Routes>
  );
};

export default App;
