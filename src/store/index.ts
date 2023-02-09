import { configureStore } from '@reduxjs/toolkit';
import { timerSettingsReducer } from './timer/timerSettingsSlice';
import { tasksReducer } from './tasks/tasksSlice';
import { timerReducer } from './timer/timerSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
    timerSettings: timerSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
