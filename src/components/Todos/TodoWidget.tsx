// import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import useAppSelector from '../../hooks/useAppSelector';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import AddTodo from './AddTodo';
import filterTasksByDeadline from './helpers/filterTasksByDeadline';

const TodoWidget = ({ deadline }: { deadline: string }) => {
  const todos = useAppSelector((state) => state.tasks.list);
  const filteredTodos = filterTasksByDeadline(todos, deadline);
  console.log(filteredTodos);

  return (
    <>
      <h1>{deadline}</h1>
      <StatsWidget tasks={filteredTodos} />
      {/* <TodoForm /> */}
      <AddTodo />
      <TodoList todos={filteredTodos} />
      <TodoCompletedList todos={filteredTodos} />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
