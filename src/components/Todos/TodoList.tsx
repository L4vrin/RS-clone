import {ITodo} from './interfaces/todiInterfaces';
import Todo from './Todo';
import styles from './styles/TodoList.module.scss';

const TodoList = ({todos, deleteTodo, toggleTodo}: any) => {
  const notCompletedTodos = todos.filter((todo: ITodo) => !todo.isCompleted);
  return (
      <div className={styles.todoList}>
        {!!notCompletedTodos.length && <h2>Todo list</h2>}
        {notCompletedTodos.map((todo: ITodo) => {
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
