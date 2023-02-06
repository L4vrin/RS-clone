import {useState} from 'react';
import {FiPlus} from 'react-icons/fi';
import {TodoEvent, ITodoAdd} from './types/data';
import styles from './styles/TodoForm.module.scss';

const TodoForm: React.FC<ITodoAdd> = ({addTodo}) => {
  const [text, setText] = useState('');

  const changeTextHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e: TodoEvent) => {
    e.preventDefault();
    if (text) {
      addTodo(text);
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
          value={text}
          onChange={changeTextHandler}
        />
      </div>
    </form>
  );
};

export default TodoForm;
