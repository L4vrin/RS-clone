import { BiCircle, BiCheckCircle } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import useActions from '../../hooks/useActions';
import { ITask } from '../../models';
import styles from './styles/Todo.module.scss';

const Todo = ({ todo }: { todo: ITask }) => {
  const { toggleComplete, deleteTask } = useActions();

  return (
    <div className={styles.todo}>
      {!todo.isCompleted ? (
        <BiCircle
          className={styles.todoCircleIcon}
          onClick={() => {
            toggleComplete(todo.id);
          }}
        />
      ) : (
        <BiCheckCircle
          className={styles.todoCheckedCircleIcon}
          onClick={() => {
            toggleComplete(todo.id);
          }}
        />
      )}
      <div className={`${todo.isCompleted ? styles.todoCompletedText : styles.todoText}`}>
        {todo.title}
      </div>
      <RiDeleteBin2Line className={styles.todoDeleteIcon} onClick={() => deleteTask(todo.id)} />
    </div>
  );
};

export default Todo;
