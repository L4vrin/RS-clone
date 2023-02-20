import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import StatsWidget from '../StatsWidget';
import Timer from '../Timer';
import TimerSettingsWidget from '../TimerSettingsWidget';
import AddTodo from './AddTodo';
import filterTasksByDeadline from './helpers/filterTasksByDeadline';
import { useGetAllUserTasksQuery } from '../../store/tasks/tasksApi';
import { ITask } from '../../models';
import styles from './styles/TodoWidget.module.scss'; // conflicted mark, prob needs to be deleted

const TodoWidget = ({ deadline }: { deadline: string }) => {
  const userId = localStorage.getItem('userId');
  const { data: todos = [], isLoading } = useGetAllUserTasksQuery(userId);

  const userTodos = todos.filter((todo: ITask) => todo.user?._id === userId);
  const filteredTodos = filterTasksByDeadline(userTodos, deadline);
  const InCompletedTodos = filteredTodos.filter((task: ITask) => !task.isCompleted);
  const completedTodos = filteredTodos.filter((task: ITask) => task.isCompleted);
  
  return (
    <>
      <StatsWidget todos={filteredTodos} />
      <AddTodo deadline={deadline} />
      <TodoList todos={InCompletedTodos} isLoading={isLoading} deadline={deadline} />
      <TodoCompletedList todos={completedTodos} isLoading={isLoading} deadline={deadline} />
      <Timer />
      <TimerSettingsWidget />
    </>
  );
};

export default TodoWidget;
