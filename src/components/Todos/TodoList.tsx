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
  const notCompletedArray = todos.filter((task: ITask) => !task.isCompleted);
  const { t } = useTranslation();
  return (
    <div className={notCompletedArray.length > 0 ? styles.todoList : styles.hidden}>
      {!!notCompletedArray && <h2>{t('TaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {notCompletedArray.map((todo: ITask) => {
        return <Todo key={todo._id} todo={todo} deadline={deadline} />;
      })}
    </div>
  );
};

export default TodoList;
