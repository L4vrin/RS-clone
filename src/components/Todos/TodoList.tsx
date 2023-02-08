import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import { ITask } from '../../models';

const TodoList = ({ todos }: { todos: ITask[] }) => {
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);
  return (
    <>
      <div className={styles.todoList}>
        {!!notCompletedTodos.length && <h2>Todo list</h2>}
        {notCompletedTodos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </div>
    </>
  );
};

export default TodoList;
