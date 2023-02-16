import {useState} from 'react';
import {BiCircle, BiCheckCircle} from 'react-icons/bi';
import {BsPlayCircle} from 'react-icons/bs';
import {GrMoreVertical} from 'react-icons/gr';
import {SlClock} from 'react-icons/sl';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import {ITask} from '../../models';
import EditPanel from './EditPanel';
import {useUpdateTodoMutation} from '../../store/tasks/tasksApi';
import styles from './styles/Todo.module.scss';

const Todo = ({todo}: {todo: ITask}) => {
  const [isEditState, setIsEditState] = useState(false);
  const {addTaskToTimer, removeTaskFromTimer} = useActions();
  const taskInTimer = useAppSelector((state) => state.timer.currentTask);
  const [updateTodo, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] =
    useUpdateTodoMutation();

  return (
    <div className={styles.todoWrapper}>
      {!isEditState ? (
        <div className={styles.todo}>
          {!todo.isCompleted ? (
            <div>
              {!isLoadingUpdate && !isSuccessUpdate ? (
                <div>
                  <BiCircle
                    className={styles.todoCircleIcon}
                    onClick={() => {
                      updateTodo({...todo, isCompleted: !todo.isCompleted});
                      removeTaskFromTimer(todo._id);
                    }}
                  />
                  <button
                    className={styles.todoAddToTimerBtn}
                    type="button"
                    aria-label="Add task to timer"
                    onClick={() => addTaskToTimer(todo)}
                  >
                    {taskInTimer?._id === todo._id ? (
                      <SlClock />
                    ) : (
                      <BsPlayCircle />
                    )}
                  </button>{' '}
                </div>
              ) : (
                <div className={styles.loader} />
              )}
            </div>
          ) : (
            <div>
              {!isLoadingUpdate && !isSuccessUpdate ? (
                <BiCheckCircle
                  className={styles.todoCheckedCircleIcon}
                  onClick={() => {
                    updateTodo({...todo, isCompleted: !todo.isCompleted});
                  }}
                />
              ) : (
                <div className={styles.loader} />
              )}
            </div>
          )}

          <div
            className={`${
              todo.isCompleted ? styles.todoCompletedText : styles.todoText
            }`}
          >
            <div className={styles.title}>{todo.title}</div>
          </div>
          <div>
            <span className={styles.PomodoroIcon}>🍅</span>
            <span>
              {todo.completedPomodors}/{todo.pomodorosNumber}
            </span>
          </div>
          <div>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => setIsEditState(true)}
            >
              <GrMoreVertical />
            </button>
          </div>
        </div>
      ) : (
        <EditPanel task={todo} close={() => setIsEditState(false)} />
      )}
    </div>
  );
};

export default Todo;
