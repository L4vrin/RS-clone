import {useState} from 'react';
import styles from './styles/TodoForm.module.scss';
import {FiPlus} from 'react-icons/fi';

type TodoEvent = React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>

const TodoForm = () => {
  const [text, setText] = useState('');
  const onSubmitHandler = (e: TodoEvent ) => {
    e.preventDefault();
    setText('');
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.input_wrapper}>
        <FiPlus className={styles.input_add} onClick = {onSubmitHandler}/>
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
