import {BiCircle, BiCheckCircle} from 'react-icons/bi';
import {BsPlayCircle} from 'react-icons/bs';
import {RiDeleteBin2Line} from 'react-icons/ri';
import {SlClock} from 'react-icons/sl';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import {ITask} from '../../models';
import {useUpdateTodoMutation} from '../../store/tasks/tasksApi';
import styles from './styles/Todo.module.scss';

const Todo = ({todo}: {todo: ITask}) => {
  const {deleteTask, addTaskToTimer, removeTaskFromTimer} = useActions();
  const taskInTimer = useAppSelector((state) => state.timer.currentTask);
  // const [addNewUser, {isLoading, isError, isSuccess}] = useCreateUserMutation();
  const [updateTodo, {isLoading, isSuccess}] = useUpdateTodoMutation();

  return (
    <div className={styles.todo}>
      {!todo.isCompleted ? (
        <div className={styles.wrapperBtn}>
          {!isLoading && !isSuccess ? (
            <BiCircle
              className={styles.todoCircleIcon}
              onClick={() => {
                updateTodo({...todo, isCompleted: !todo.isCompleted});
                removeTaskFromTimer(todo._id);
              }}
            />
          ) : (
            <div className={styles.loader} />
          )}

          <button
            className={styles.todoAddToTimerBtn}
            type="button"
            aria-label="Add task to timer"
            onClick={() => addTaskToTimer(todo)}
          >
            {taskInTimer?._id === todo._id ? <SlClock /> : <BsPlayCircle />}
          </button>
        </div>
      ) : (
        <div className={styles.wrapperBtn}>
        {!isLoading && !isSuccess ? ( <BiCheckCircle
          className={styles.todoCheckedCircleIcon}
          onClick={() => {
            updateTodo({...todo, isCompleted: !todo.isCompleted});
          }}
        />) : (<div className={styles.loader} />)}
        </div>
      )}

      <div
        className={`${
          todo.isCompleted ? styles.todoCompletedText : styles.todoText
        }`}
      >
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
