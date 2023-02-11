import { configureStore } from '@reduxjs/toolkit';
import { timerSettingsReducer } from './timer/timerSettingsSlice';
import { tasksReducer } from './tasks/tasksSlice';
import { timerReducer } from './timer/timerSlice';
import { usersApi } from './auth/usersApi';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
    timerSettings: timerSettingsReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(usersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;


