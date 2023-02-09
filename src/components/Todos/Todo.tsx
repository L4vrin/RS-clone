import { BiCircle, BiCheckCircle } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import useActions from '../../hooks/useActions';
import { ITask } from '../../models';
import styles from './styles/Todo.module.scss';

const Todo = ({ todo }: { todo: ITask }) => {
  const { toggleComplete, deleteTask, addTaskToTimer } = useActions();

  return (
    <div className={styles.todo}>
      {!todo.isCompleted ? (
        <>
          <BiCircle
            className={styles.todoCircleIcon}
            onClick={() => {
              toggleComplete(todo.id);
            }}
          />
          <button
            className={styles.todoAddToTimerBtn}
            type="button"
            aria-label="Add task to timer"
            onClick={() => addTaskToTimer(todo)}
          >
            <BsPlayCircle />
          </button>
        </>
      ) : (
        <BiCheckCircle
          className={styles.todoCheckedCircleIcon}
          onClick={() => {
            toggleComplete(todo.id);
          }}
        />
      )}

      <div className={`${todo.isCompleted ? styles.todoCompletedText : styles.todoText}`}>
        <div className={styles.title}>{todo.title}</div>
        <div>
          <span className={styles.PomodoroIcon}>🍅</span>
          <span>
            {todo.completedPomodors}/{todo.pomodorosNumber}
          </span>
        </div>
      </div>
      <RiDeleteBin2Line className={styles.todoDeleteIcon} onClick={() => deleteTask(todo.id)} />
    </div>
  );
};

export default Todo;
