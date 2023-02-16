import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import AddTodo from './AddTodo';
import filterTasksByDeadline from './helpers/filterTasksByDeadline';

import {useGetAllTasksQuery} from '../../store/tasks/tasksApi';
import {ITask} from '../../models';

const TodoWidget = ({ deadline }: { deadline: string }) => {

  const {data: todos = [], isLoading} = useGetAllTasksQuery();
  console.log(todos)
  const userTodos = todos.filter(
    (todo: ITask) => todo.user?._id === localStorage.getItem('userId')
    );
  const filteredTodos = filterTasksByDeadline(userTodos, deadline);

  return (
    <>
      <h1>{deadline}</h1>
      <StatsWidget todos={filteredTodos} />
      <AddTodo />
      <TodoList todos={filteredTodos} isLoading = {isLoading}/>
      <TodoCompletedList todos={filteredTodos} isLoading = {isLoading}/>
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
