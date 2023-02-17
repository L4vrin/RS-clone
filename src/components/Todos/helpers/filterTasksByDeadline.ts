import { ITask } from '../../../models';

function checkDeadline(deadlineAt: number, deadlineId: string): boolean {
  const now = new Date();
  const endToday = now.setHours(23, 59, 59, 999);
  const endTodayDate = new Date(endToday);
  const deadlineDate = new Date(deadlineAt);
  // console.log('Deadline: ', deadlineDate);
  // console.log('Tomorrow: ', new Date(new Date(endToday).setDate(new Date().getDate() + 1)));
  // console.log(
  //   'End Weeek:',
  //   new Date(endTodayDate.setDate(endTodayDate.getDate() - endTodayDate.getDay() + 7))
  // );
  // console.log('7 days:', new Date(endTodayDate.setDate(now.getDate() + 7)));

  // console.log(
  //   deadlineAt <= endTodayDate.setDate(endTodayDate.getDate() - endTodayDate.getDay() + 7)
  // );

  switch (deadlineId) {
    case 'today':
      return deadlineAt <= endToday;

    case 'tomorrow':
      return (
        deadlineAt > endToday &&
        deadlineAt <= endTodayDate.setDate(now.getDate() + 1)
      );

    case 'week':
      return (
        deadlineAt <=
        endTodayDate.setDate(endTodayDate.getDate() - endTodayDate.getDay() + 7)
      );

    case '7days':
      return deadlineAt <= endTodayDate.setDate(now.getDate() + 7);

    default:
      console.log('default!');
      return true;
  }
}

function filterTasksByDeadline(tasks: ITask[], deadlineId: string) {
  return tasks.filter((task) => checkDeadline(task.deadlineAt, deadlineId));
}

export default filterTasksByDeadline;
