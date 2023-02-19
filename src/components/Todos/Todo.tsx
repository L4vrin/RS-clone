import { useState, useRef } from 'react';
import { BiCircle, BiCheckCircle } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { GrMoreVertical } from 'react-icons/gr';
import { SlClock } from 'react-icons/sl';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import { ITask } from '../../models';
import EditPanel from './EditPanel';
import { useUpdateTodoMutation } from '../../store/tasks/tasksApi';
import formatDeadlineDate from './helpers/formatDeadlineDate';
import styles from './styles/Todo.module.scss';

const Todo = ({ todo, deadline }: { todo: ITask; deadline: string }) => {
  const [isEditState, setIsEditState] = useState(false);
  const { addTaskToTimer, removeTaskFromTimer } = useActions();

  const taskInTimer = useAppSelector((state) => state.timer.currentTask);
  const [updateTodo, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateTodoMutation();

  const controlRef = useRef<HTMLButtonElement>(null);
  const { formattedDate, isExpired } = formatDeadlineDate(todo.deadlineAt);

  return (
    <div className={styles.todoWrapper}>
      {!isEditState ? (
        <div>
          <div className={styles.todo}>
            {!todo.isCompleted ? (
              <div className={styles.inlineFlex}>
                {!isLoadingUpdate && !isSuccessUpdate ? (
                  <div className={styles.inlineFlex}>
                    <BiCircle
                      className={styles.todoCircleIcon}
                      onClick={() => {
                        updateTodo({ ...todo, isCompleted: !todo.isCompleted });
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
                  </div>
                ) : (
                  <div className={styles.loader} />
                )}
              </div>
            ) : (
              <div className={styles.inlineFlex}>
                {!isLoadingUpdate && !isSuccessUpdate ? (
                  <BiCheckCircle
                    className={styles.todoCheckedCircleIcon}
                    onClick={() => {
                      updateTodo({ ...todo, isCompleted: !todo.isCompleted });
                    }}
                  />
                ) : (
                  <div className={styles.loader} />
                )}
              </div>
            )}

            <div className={`${todo.isCompleted ? styles.todoCompletedText : styles.todoText}`}>
              <div className={styles.title}>{todo.title}</div>
            </div>
            <div className={isExpired ? styles.expiredDate : styles.date}>{formattedDate}</div>
            <div className={styles.stats}>
              <span className={styles.PomodoroIcon}>🍅</span>
              <span>
                {todo.completedPomodors}/{todo.pomodorosNumber}
              </span>
            </div>
            <div>
              <button
                ref={controlRef}
                type="button"
                className={styles.editBtn}
                onClick={() => setIsEditState(true)}
              >
                <GrMoreVertical />
              </button>
            </div>
          </div>

          {todo.note && (
            <div className={styles.noteContainer}>
              <p className={styles.noteText}>{todo.note}</p>
            </div>
          )}
        </div>
      ) : (
        <EditPanel
          task={todo}
          onClose={() => setIsEditState(false)}
          isAdd={false}
          deadline={deadline}
          openButton={controlRef.current}
        />
      )}
    </div>
  );
};

export default Todo;
