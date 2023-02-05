import {BiCircle} from 'react-icons/bi';
import {RiDeleteBin2Line} from 'react-icons/ri';
import {ITodo} from './interfaces/todiInterfaces';
import styles from './styles/Todo.module.scss';

const Todo = ({todo, deleteTodo}: {todo: ITodo; deleteTodo: Function}) => {
  return (
    <div className={styles.todo}>
      <BiCircle className={styles.todoCircleIcon} />
      <div className={styles.todoText}>{todo.text}</div>
      <RiDeleteBin2Line
        className={styles.todoDeleteIcon}
        onClick={() =>
          deleteTodo(todo.id) as React.MouseEventHandler<SVGElement>
        }
      />
    </div>
  );
};

export default Todo;
