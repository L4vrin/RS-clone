import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import styles from './styles/TaskPage.module.scss';

const TasksPage = () => {
  return (
    <div className={styles.taskPageContainer}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default TasksPage;
