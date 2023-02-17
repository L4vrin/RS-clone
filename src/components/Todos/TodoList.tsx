import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import { ITask } from '../../models';

type TodoListProps = {
  todos: ITask[];
  isLoading: boolean;
};

const TodoList = ({ todos, isLoading }: TodoListProps) => {
  const notCompletedArray = todos.filter((task: ITask) => !task.isCompleted);
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
