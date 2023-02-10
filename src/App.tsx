import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Today from './pages/Today';
import Week from './pages/Week';
import Tomorrow from './pages/Tomorrow';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Today />} />
        <Route path="today" index element={<Today />} />
        <Route path="tomorrow" element={<Tomorrow />} />
        <Route path="this-week" element={<Week />} />
        {/* <Route path="*" element={<Notfound />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
