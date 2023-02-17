import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import SideBar from '../components/SideBar';

const TasksPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('today');
  }, []);

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default TasksPage;
