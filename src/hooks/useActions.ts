import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { timerSettingsActions } from '../store/timer/timerSettingsSlice';
import { tasksActions } from '../store/tasks/tasksSlice';
import { timerActions } from '../store/timer/timerSlice';

const actions = {
  ...tasksActions,
  ...timerActions,
  ...timerSettingsActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
