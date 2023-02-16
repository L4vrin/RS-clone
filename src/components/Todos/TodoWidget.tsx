// import TodoForm from './TodoForm';
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
  const todos = useAppSelector((state) => state.tasks.list);
  const filteredTodos = filterTasksByDeadline(todos, deadline);
  console.log(filteredTodos);
  const {data: todos = [], isLoading} = useGetAllTasksQuery();
  const userTodos = todos.filter(
    (todo: ITask) => todo.user?._id === localStorage.getItem('userId')
  );
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
