import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';
import {ITask} from '../../models';

type TodoCompletedListProps = {
  todos: ITask[];
  isLoading: boolean;
};

const TodoCompletedList = ({todos, isLoading}: TodoCompletedListProps) => {
  const completedArray = todos.filter((task: ITask) => task.isCompleted);
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
