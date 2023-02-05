import {useState} from 'react';
import styles from './styles/TodoForm.module.scss';
import {FiPlus} from 'react-icons/fi';
import {TodoEvent} from './types/todoTypes';

const TodoForm = ({addTodo}: {addTodo: Function}) => {
  const [text, setText] = useState('');
  const onSubmitHandler = (e: TodoEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.inputWrapper}>
        <FiPlus className={styles.inputAdd} onClick={onSubmitHandler} />
        <input
          className={styles.input}
          type="text"
          placeholder='Adding task in "Tasks". Press Enter for save'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </form>
  );
};

export default TodoForm;
