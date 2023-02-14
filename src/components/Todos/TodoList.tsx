import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import {ITask} from '../../models';
import {useGetAllTasksQuery} from '../../store/tasks/tasksApi';

const TodoList = () => {
  const {data = []} = useGetAllTasksQuery();
  const notCompletedArray = data.filter(
    (task: ITask) =>
      !task.isCompleted && task.user?.email === localStorage.getItem('email')
  );

  return (
    <div className={styles.todoList}>
      {!!notCompletedArray && <h2>Todo list</h2>}
      {notCompletedArray.map((todo: ITask) => {
        return <Todo key={todo._id} todo={todo} />;
      })}
    </div>
  );
};

export default TodoList;
