import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';
import { ITask } from '../../models';
import { useGetAllTasksQuery } from '../../store/tasks/tasksApi';

const TodoCompletedList = () => {
  const {data = [], isLoading} = useGetAllTasksQuery();
  const completedArray = data.filter(
    (task: ITask) =>
      task.isCompleted && task.user?.email === localStorage.getItem('email')
  );
  return (
    <div className={styles.todoCompletedList}>
      {!!completedArray.length && <h2>Completed Todo list</h2>}
      {isLoading && <div className={styles.loader} />}
      {completedArray.map((todo) => {
        return <Todo key={todo._id} todo={todo} />;
      })}
    </div>
  );
};

export default TodoCompletedList;
