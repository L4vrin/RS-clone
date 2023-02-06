import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';
import {ITodoListProps, ITodo} from './types/data';

const TodoCompletedList: React.FC<ITodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
}) => {
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
