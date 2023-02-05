import {useState} from 'react';
import styles from './styles/TodoForm.module.scss';

const TodoForm = () => {
  const [text, setText] = useState('');
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText('');
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input
        className={styles.input}
        type="text"
        placeholder='Adding task in "Tasks". Press Enter for save'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default TodoForm;
