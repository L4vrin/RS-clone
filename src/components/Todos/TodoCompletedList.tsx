import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';
import { ITask } from '../../models';

const TodoCompletedList = ({ todos }: { todos: ITask[] }) => {
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  return (
    <div
      className={
        completedTodos.length ? styles.todoCompletedList : styles.hidden
      }
    >
      {!!completedTodos.length && <h2>Completed</h2>}
      {completedTodos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
};

export default TodoCompletedList;
