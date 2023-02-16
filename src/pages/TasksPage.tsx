import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

const TasksPage = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default TasksPage;
