import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import { useGetAllTasksQuery } from '../../store/tasks/tasksApi';

const TodoWidget = () => {
  const {data = [], isLoading} = useGetAllTasksQuery();

  return (
    <>
      <StatsWidget todos={data} isLoading = {isLoading} />
      <TodoForm />
      <TodoList />
      <TodoCompletedList />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
