import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Today from './pages/Today';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Today />} />
        {/* <Route path="tomorrow" element={<Tomorrow />} />
        <Route path="week" element={<Week />} />
        <Route path="*" element={<Notfound />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
