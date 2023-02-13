import { BiCircle, BiCheckCircle } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { SlClock } from 'react-icons/sl';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import { ITask } from '../../models';
import styles from './styles/Todo.module.scss';

const Todo = ({ todo }: { todo: ITask }) => {
  const { toggleComplete, deleteTask, addTaskToTimer, removeTaskFromTimer } = useActions();
  const taskInTimer = useAppSelector((state) => state.timer.currentTask);

  return (
    <div className={styles.todo}>
      {!todo.isCompleted ? (
        <>
          <BiCircle
            className={styles.todoCircleIcon}
            onClick={() => {
              toggleComplete(todo._id);
              removeTaskFromTimer(todo._id);
            }}
          />
          <button
            className={styles.todoAddToTimerBtn}
            type="button"
            aria-label="Add task to timer"
            onClick={() => addTaskToTimer(todo)}
          >
            {taskInTimer?._id === todo._id ? <SlClock /> : <BsPlayCircle />}
          </button>
        </>
      ) : (
        <BiCheckCircle
          className={styles.todoCheckedCircleIcon}
          onClick={() => {
            toggleComplete(todo._id);
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
      <RiDeleteBin2Line
        className={styles.todoDeleteIcon}
        onClick={() => {
          deleteTask(todo._id);
          removeTaskFromTimer(todo._id);
        }}
      />
    </div>
  );
};

export default Todo;
