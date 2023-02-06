import {ITodo} from './interfaces/todiInterfaces';
import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';

const TodoCompletedList = ({todos, deleteTodo, toggleTodo}: any) => {
  const completedTodos = todos.filter((todo: ITodo) => todo.isCompleted);
  return (
      <div className={styles.todoCompletedList}>
        {!!completedTodos.length && <h2>Completed Todo list</h2>}
        {completedTodos.map((todo: ITodo) => {
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

export default TodoCompletedList;
