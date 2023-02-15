import useAppSelector from '../../hooks/useAppSelector';
import {ITask} from '../../models';
import StatsItem from './StatsItem';
import styles from './statsWidget.module.scss';
import TimeStat from './TimeStat';

type StatsWidgetProps = {
  todos: ITask[];
  isLoading: boolean;
};

const StatsWidget = ({todos, isLoading}: StatsWidgetProps) => {
  const inCompletedTodos = todos.filter(
    (todo) =>
      !todo.isCompleted && todo.user?._id === localStorage.getItem('userId')
  );

  const estimatedTime = inCompletedTodos.reduce(
    (acc, todo) => acc + todo.pomodoroTime * todo.pomodorosNumber,
    0
  );
  const spentTime = todos.reduce(
    (acc, todo) => acc + todo.completedPomodors * todo.pomodoroTime,
    0
  );

  const numberIncompleteTodos = inCompletedTodos.length;
  const numberCompletedTodos = todos.length - numberIncompleteTodos;

  return (
    <div className={`container ${styles.container}`}>
      <StatsItem stat={<TimeStat time={estimatedTime} />} description="Estimated time" />
      <StatsItem stat={numberIncompleteTodos} description="Incomplete tasks" />
      <StatsItem stat={<TimeStat time={spentTime} />} description="Spent time" />
      <StatsItem stat={numberCompletedTodos} description="Completed tasks" />
    </div>
  );
};

export default StatsWidget;
