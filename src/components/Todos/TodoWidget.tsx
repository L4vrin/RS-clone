import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import useAppSelector from '../../hooks/useAppSelector';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer/Timer';
import TimerSettingsWidget from '../TimerSettingsWidget/TimerSettingsWidget';

const TodoWidget = () => {
  const todos = useAppSelector((state) => state.tasks.list);
  return (
    <>
      <StatsWidget tasks={todos} />
      <TodoForm />
      <TodoList />
      <TodoCompletedList />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
