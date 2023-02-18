import { Reorder } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import { ITask } from '../../models';

interface TodoListProps {
  todos: ITask[];
  isLoading: boolean;
  deadline: string;
}

const TodoList = ({ todos, isLoading, deadline }: TodoListProps) => {
  const { t } = useTranslation();

  const [inCompletedTodos, setInCompletedTodos] = useState(todos);
  useEffect(() => {
    setInCompletedTodos(todos);
  }, [todos]);

  return (
    <Reorder.Group
      axis="y"
      className={styles.todoList}
      onReorder={setInCompletedTodos}
      values={inCompletedTodos}
    >
      {!!todos && <h2>{t('TaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {inCompletedTodos.map((todo: ITask) => (
        <Reorder.Item
          key={todo._id}
          className={styles.todoWrapper}
          value={todo}
          whileDrag={{
            scale: 1.05,
            boxShadow: '0px 10px 10px -7px #000000',
          }}
        >
          <Todo todo={todo} deadline={deadline} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TodoList;
