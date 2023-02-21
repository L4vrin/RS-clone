import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BiCircle, BiCheckCircle, BiCheck } from 'react-icons/bi';
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

  const [containerHeight, setContainerHeight] = useState<number | string>();
  const [overflow, setOverflow] = useState('hidden');
  const containerRef = useRef<HTMLDivElement>(null);

  const calcHeight = (el: HTMLElement) => {
    let containerBorders = 0;
    if (containerRef.current)
      containerBorders = containerRef.current.offsetHeight - containerRef.current.clientHeight;

    const height = el.offsetHeight + containerBorders;
    setContainerHeight(height);
    setOverflow('hidden');
  };

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight);
  }, []);

  const openEditPanel = () => {
    setContainerHeight(containerRef.current?.offsetHeight);
    setIsEditState(true);
  };

  const closeEditPanel = () => {
    setContainerHeight(containerRef.current?.offsetHeight);
    setIsEditState(false);
  };

  return (
    <div
      className={styles.todoWrapper}
      ref={containerRef}
      style={{ height: containerHeight, overflow }}
    >
      <CSSTransition
        in={isEditState}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
        onEntered={() => {
          setOverflow('unset');
          setContainerHeight('auto');
        }}
        onExited={() => setContainerHeight('auto')}
      >
        <EditPanel
          task={todo}
          onClose={closeEditPanel}
          isAdd={false}
          deadline={deadline}
          openButton={controlRef.current}
        />
      </CSSTransition>

      <CSSTransition
        in={!isEditState}
        unmountOnExit
        timeout={{ appear: 0, enter: 500, exit: 0 }}
        onEnter={calcHeight}
        onEntered={() => setContainerHeight('auto')}
      >
        <div>
          <div className={styles.todo}>
            {!todo.isCompleted ? (
              <div className={styles.inlineFlex}>
                {!isLoadingUpdate && !isSuccessUpdate ? (
                  <div className={styles.inlineFlex}>
                    <button
                      type="button"
                      className={styles.checkButton}
                      onClick={() => {
                        updateTodo({ ...todo, isCompleted: !todo.isCompleted });
                      }}
                    >
                      <BiCheck className={styles.todoCircleIcon} />
                    </button>

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
                  <button
                    type="button"
                    className={`${styles.checkButton} ${styles.checkButtonCompleted}`}
                    onClick={() => {
                      updateTodo({ ...todo, isCompleted: !todo.isCompleted });
                    }}
                  >
                    <BiCheck className={styles.todoCheckedCircleIcon} />
                  </button>
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
                onClick={openEditPanel}
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
      </CSSTransition>
    </div>
  );
};

export default Todo;
