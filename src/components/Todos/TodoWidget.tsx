import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import {useGetAllTasksQuery} from '../../store/tasks/tasksApi';
import {ITask} from '../../models';

const TodoWidget = () => {
  const {data: todos = [], isLoading} = useGetAllTasksQuery();
  const userTodos = todos.filter(
    (todo: ITask) => todo.user?._id === localStorage.getItem('userId')
  );
  return (
    <>
      <StatsWidget todos={userTodos} />
      <TodoForm />
      <TodoList todos={userTodos} isLoading={isLoading} />
      <TodoCompletedList todos={userTodos} isLoading={isLoading} />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
