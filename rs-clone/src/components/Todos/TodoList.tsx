import {ITodo} from './interfaces/todiInterfaces';
import Todo from './Todo';
import styles from './styles/TodoList.module.scss';

const TodoList = ({todos}: {todos: Array<ITodo>}) => {
  return (
    <>
    <div className={styles.todoList}>
      {!todos.length && <h2>Todo list is empty</h2>}
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
    </>
  );
};

export default TodoList;
