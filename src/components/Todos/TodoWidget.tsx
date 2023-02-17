import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import AddTodo from './AddTodo';
import filterTasksByDeadline from './helpers/filterTasksByDeadline';

import { useGetAllTasksQuery } from '../../store/tasks/tasksApi';
import { ITask } from '../../models';

const TodoWidget = ({ deadline }: { deadline: string }) => {
  const { data: todos = [], isLoading } = useGetAllTasksQuery();

  const userTodos = todos.filter(
    (todo: ITask) => todo.user?._id === localStorage.getItem('userId')
  );

  const filteredTodos = filterTasksByDeadline(userTodos, deadline);

  return (
    <>
      <StatsWidget todos={filteredTodos} />
      <AddTodo deadline={deadline} />
      <TodoList todos={filteredTodos} isLoading={isLoading} deadline={deadline} />
      <TodoCompletedList todos={filteredTodos} isLoading={isLoading} deadline={deadline} />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
