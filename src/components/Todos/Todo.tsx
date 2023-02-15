import { useState } from 'react';
import { BiCircle, BiCheckCircle } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { GrMoreVertical } from 'react-icons/gr';
import { SlClock } from 'react-icons/sl';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import { ITask } from '../../models';
import EditPanel from './EditPanel';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../../store/tasks/tasksApi';
import styles from './styles/Todo.module.scss';

const Todo = ({ todo }: { todo: ITask }) => {
  const [isEditState, setIsEditState] = useState(false);
  const { toggleComplete, addTaskToTimer, removeTaskFromTimer } = useActions();
  const taskInTimer = useAppSelector((state) => state.timer.currentTask);
  // const [addNewUser, {isLoading, isError, isSuccess}] = useCreateUserMutation();
  const [updateTodo, {isLoading, isSuccess}] = useUpdateTodoMutation();
  const [deleteTodo, {isLoading: isLoadingDelete, isSuccess: isSuccessDelete}] =
    useDeleteTodoMutation();

  // const toggledTask = state.list.find(
  //   (task) => task._id === action.payload
  // );
  // if (toggledTask) {
  //   toggledTask.isCompleted = !toggledTask.isCompleted;
  //   localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
  // }

  return (
    <div className={styles.todoWrapper}>
      {!isEditState ? (
        <div className={styles.todo}>
          {!todo.isCompleted ? (
            <>
              <BiCircle
                className={styles.todoCircleIcon}
                onClick={() => {
                  toggleComplete(todo.id);
                  removeTaskFromTimer(todo.id);
                }}
              />
              <button
                className={styles.todoAddToTimerBtn}
                type="button"
                aria-label="Add task to timer"
                onClick={() => addTaskToTimer(todo)}
              >
                {taskInTimer?.id === todo.id ? <SlClock /> : <BsPlayCircle />}
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
          </div>
          <div>
            <span className={styles.PomodoroIcon}>🍅</span>
            <span>
              {todo.completedPomodors}/{todo.pomodorosNumber}
            </span>
          </div>
          <div>
            <button type="button" className={styles.editBtn} onClick={() => setIsEditState(true)}>
              <GrMoreVertical />
            </button>
          </div>
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
