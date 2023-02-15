// import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import useAppSelector from '../../hooks/useAppSelector';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import AddTodo from './AddTodo';

const TodoWidget = () => {
  const todos = useAppSelector((state) => state.tasks.list);

  return (
    <>
      <StatsWidget tasks={todos} />
      {/* <TodoForm /> */}
      <AddTodo />
      <TodoList todos={todos} />
      <TodoCompletedList todos={todos} />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
