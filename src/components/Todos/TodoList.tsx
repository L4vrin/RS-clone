import Todo from './Todo';
import styles from './styles/TodoList.module.scss';

import {ITodoListProps} from './types/data';

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
}) => {
  const notCompletedTodos = todos.filter((todo) => !todo.isCompleted);
  return (
    <div className={styles.todoList}>
      {!!notCompletedTodos.length && <h2>Todo list</h2>}
      {notCompletedTodos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
