import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { timerSettingsActions } from '../store/settings/timerSettingsSlice';
import { tasksActions } from '../store/tasks/tasksSlice';

const actions = {
  ...tasksActions,
  ...timerSettingsActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
