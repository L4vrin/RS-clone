import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TodoEvent } from './types/todoTypes';
import styles from './styles/TodoForm.module.scss';
import useActions from '../../hooks/useActions';

const TodoForm = () => {
  const { addTask } = useActions();
  const [title, setText] = useState('');

  const onSubmitHandler = (e: TodoEvent) => {
    e.preventDefault();
    if (title) {
      addTask(title);
      setText('');
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.inputWrapper}>
        <FiPlus className={styles.inputAdd} onClick={onSubmitHandler} />
        <input
          className={styles.input}
          type="text"
          placeholder='Adding task in "Todo list". Press Enter for save'
          value={title}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </form>
  );
};

export default TodoForm;
