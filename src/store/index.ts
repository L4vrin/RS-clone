import { configureStore } from '@reduxjs/toolkit';
import { timerSettingsReducer } from './settings/timerSettingsSlice';
import { tasksReducer } from './tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timerSettings: timerSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
