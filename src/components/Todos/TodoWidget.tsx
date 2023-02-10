import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import useAppSelector from '../../hooks/useAppSelector';
import StatsWidget from '../StatsWidget';
import styles from './styles/TodoWidget.module.scss';

const TodoWidget = () => {
  const todos = useAppSelector((state) => state.tasks.list);

  return (
    <div className={styles.todoWidget__wrapper}>
      <StatsWidget tasks={todos} />
      <TodoForm />
      <TodoList todos={todos} />
      <TodoCompletedList todos={todos} />
    </div>
  );
};

export default TodoWidget;
