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
  const completedArray = todos.filter((task: ITask) => task.isCompleted);
  const { t } = useTranslation();
  return (
    <div className={completedArray.length > 0 ? styles.todoCompletedList : styles.hidden}>
      {!!completedArray.length && <h2>{t('CompletedTaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {completedArray.map((todo) => {
        return <Todo key={todo._id} todo={todo} deadline={deadline} />;
      })}
    </div>
  );
};

export default TodoCompletedList;
