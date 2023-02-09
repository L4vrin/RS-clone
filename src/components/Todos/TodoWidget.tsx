import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import useAppSelector from '../../hooks/useAppSelector';
import StatsWidget from '../StatsWidget';

const TodoWidget = () => {
  const todos = useAppSelector((state) => state.tasks.list);

  return (
    <>
      <StatsWidget tasks={todos} />
      <TodoForm />
      <TodoList todos={todos} />
      <TodoCompletedList todos={todos} />
    </>
  );
};

export default TodoWidget;
