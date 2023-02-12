import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TodoEvent } from './types/data';
import styles from './styles/TodoForm.module.scss';
import useActions from '../../hooks/useActions';
import PomodoroRange from '../ui/PomodoroRange';
import useAppSelector from '../../hooks/useAppSelector';

const TodoForm = () => {
  const { addNewTask } = useActions();
  const [title, setTitle] = useState('');
  const [pomodorosNumber, setPomodorosNumbers] = useState(0);
  const pomodoroTime = useAppSelector((state) => state.timerSettings.workPeriodInMinutes);

  const onSubmitHandler = (e: TodoEvent) => {
    e.preventDefault();

    if (title) {
      addNewTask({ title, pomodorosNumber, pomodoroTime, deadlineId: 'today' });
      setTitle('');
    }
  };

  const handleRangeChange = (value: number) => {
    setPomodorosNumbers(value);
  };

  return (
    <div className={styles.newTask}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.inputWrapper}>
          <FiPlus className={styles.inputAdd} onClick={onSubmitHandler} />
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
