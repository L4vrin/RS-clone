import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Todo from './Todo';
import styles from './styles/TodoCompletedList.module.scss';
import { ITask } from '../../models';

interface TodoCompletedListProps {
  todos: ITask[];
  isLoading: boolean;
  deadline: string;
}

const TodoCompletedList = ({ todos, isLoading, deadline }: TodoCompletedListProps) => {
  const { t } = useTranslation();

  const [completedTodos, setCompletedTodos] = useState(todos);
  useEffect(() => {
    setCompletedTodos(todos);
  }, [todos]);

  return (
    <Reorder.Group
      axis="y"
      className={styles.todoCompletedList }
      onReorder={setCompletedTodos}
      values={completedTodos}
    >
      {!!todos.length && <h2>{t('CompletedTaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {completedTodos.map((todo: ITask) => (
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

export default TodoCompletedList;
