import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Notfound from './pages/Notfound';
import Today from './pages/Today';
import WelcomePage from './pages/WelcomePage';
import TasksPage from './pages/TasksPage';
import TodoWidget from './components/Todos/TodoWidget';

// import Today from './pages/Today';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('today');
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="today" element={<Today />} />
        <Route path="tasks" element={<TasksPage />}>
          <Route index element={<TodoWidget deadline="today" />} />
          <Route path="tomorrow" element={<TodoWidget deadline="tomorrow" />} />
          <Route path="week" element={<TodoWidget deadline="week" />} />
          <Route path="7days" element={<TodoWidget deadline="7days" />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default App;
