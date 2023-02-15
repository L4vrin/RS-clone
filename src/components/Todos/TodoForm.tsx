import {useState} from 'react';
import {FiPlus} from 'react-icons/fi';
import {TodoEvent} from './types/data';
import styles from './styles/TodoForm.module.scss';
import useActions from '../../hooks/useActions';
import PomodoroRange from '../ui/PomodoroRange';
import useAppSelector from '../../hooks/useAppSelector';
<<<<<<< HEAD
import {useCreateTaskMutation} from '../../store/tasks/tasksApi';

const TodoForm = () => {
  const [createTask, {isLoading}] = useCreateTaskMutation();
  const {addNewTask} = useActions();
=======
import { useCreateTaskMutation } from '../../store/tasks/tasksApi';

const TodoForm = () => {
  const [createTask] = useCreateTaskMutation();
  const { addNewTask } = useActions();
>>>>>>> addTodoToServer
  const [title, setTitle] = useState('');
  const [pomodorosNumber, setPomodorosNumbers] = useState(0);
  const pomodoroTime = useAppSelector(
    (state) => state.timerSettings.workPeriodInMinutes
  );

  const onSubmitHandler = async (e: TodoEvent) => {
    e.preventDefault();

    if (title) {
<<<<<<< HEAD
      const newTaskData = addNewTask({
        title,
        pomodorosNumber,
        pomodoroTime,
        deadlineId: 'today',
      });
      await createTask(newTaskData.payload).unwrap();
=======
      const newTaskData = addNewTask({ title, pomodorosNumber, pomodoroTime, deadlineId: 'today' });
      console.log(newTaskData)
      try {
      await createTask(newTaskData.payload).unwrap()
>>>>>>> addTodoToServer
      setTitle('');
      } catch(err) {
        console.log(err)
      }
    }
  };

  const handleRangeChange = (value: number) => {
    setPomodorosNumbers(value);
  };

  return (
    <div className={styles.newTask}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.inputWrapper}>
          {!isLoading ? (
            <FiPlus className={styles.inputAdd} onClick={onSubmitHandler} />
          ) : <div className={styles.loader} />}

          <input
            className={styles.input}
            type="text"
            placeholder='Adding task in "Todo list". Press Enter for save'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </form>
      <div className={styles.pomodoroRange}>
        <PomodoroRange onChange={handleRangeChange} />
      </div>
    </div>
  );
};

export default TodoForm;
