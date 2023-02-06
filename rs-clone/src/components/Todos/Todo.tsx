import {BiCircle, BiCheckCircle} from 'react-icons/bi';
import {RiDeleteBin2Line} from 'react-icons/ri';
import styles from './styles/Todo.module.scss';

const Todo = ({todo, deleteTodo, toggleTodo}: any) => {
  return (
    <div className={styles.todo}>
      {!todo.isCompleted ? (
        <BiCircle
          className={styles.todoCircleIcon}
          onClick={() => {
            toggleTodo(todo.id);
          }}
        />
      ) : (
        <BiCheckCircle
          className={styles.todoCheckedCircleIcon}
          onClick={() => {
            toggleTodo(todo.id);
          }}
        />
      )}

      <div className={styles.todoText}>{todo.text}</div>
      <RiDeleteBin2Line
        className={styles.todoDeleteIcon}
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
  );
};

export default Todo;
