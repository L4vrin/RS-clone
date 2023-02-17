import DEADLINES from '../../../constants/deadlines';
import { checkDeadline } from './filterTasksByDeadline';

function formatDeadlineDate(
  deadline: number | string,
  locale: Intl.LocalesArgument,
  withWeek = false
) {
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 59, 999);

  if (checkDeadline(deadlineDate.getTime(), DEADLINES.today))
    return { formattedDate: 'Today', isExpired: false };

  if (checkDeadline(deadlineDate.getTime(), DEADLINES.tomorrow))
    return { formattedDate: 'Tomorrow', isExpired: false };

  const isExpired = deadlineDate.getTime() < new Date().setHours(0, 0, 0, 0);

  let options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  if (withWeek) options = { ...options, weekday: 'short' };

  const formattedDate = deadlineDate.toLocaleDateString(locale, options);

  return {
    formattedDate,
    isExpired,
  };
}

export default formatDeadlineDate;
