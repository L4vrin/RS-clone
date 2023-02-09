import { ITask } from '../../models';
import StatsItem from './StatsItem';
import styles from './statsWidget.module.scss';
import TimeStat from './TimeStat';

type StatsWidgetProps = {
  tasks: ITask[];
};

const StatsWidget = ({ tasks }: StatsWidgetProps) => {
  const inCompleteTasks = tasks.filter((task) => !task.isCompleted);

  const estimatedTime = inCompleteTasks.reduce(
    (acc, task) => acc + task.pomodoroTime * task.pomodorosNumber,
    0
  );
  const spentTime = tasks.reduce(
    (acc, task) => acc + task.completedPomodors * task.pomodoroTime,
    0
  );
  const numberIncompleteTasks = inCompleteTasks.length;
  const numberCompletedTasks = tasks.length - numberIncompleteTasks;

  return (
    <div className={`container ${styles.container}`}>
      <StatsItem stat={<TimeStat time={estimatedTime} />} description="Estimated time" />
      <StatsItem stat={numberIncompleteTasks} description="Incomplete tasks" />
      <StatsItem stat={<TimeStat time={spentTime} />} description="Spent time" />
      <StatsItem stat={numberCompletedTasks} description="Completed tasks" />
    </div>
  );
};

export default StatsWidget;
