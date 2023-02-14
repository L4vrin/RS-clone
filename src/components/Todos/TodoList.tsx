import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import {ITask} from '../../models';
import {useGetAllTasksQuery} from '../../store/tasks/tasksApi';

const TodoList = () => {
  const {data = [], isLoading} = useGetAllTasksQuery();
  const notCompletedArray = data.filter(
    (task: ITask) =>
      !task.isCompleted && task.user?.email === localStorage.getItem('email')
  );

  return (
    <div className={styles.todoList}>
      {!!notCompletedArray && <h2>Todo list</h2>}
      {isLoading && <div className={styles.loader} />}
      {notCompletedArray.map((todo: ITask) => {
        return <Todo key={todo._id} todo={todo} />;
      })}
    </div>
  );
};

export default TodoList;

// const notCompletedArray = data.filter(
//   (task: ITask) =>
//     !task.isCompleted && task.user?.fullName === localStorage.getItem('user')

// );
// console.log('localStorage', localStorage.getItem('user'));
// console.log('server', data[0])
