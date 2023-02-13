import { configureStore } from '@reduxjs/toolkit';
import { timerSettingsReducer } from './timer/timerSettingsSlice';
import { tasksReducer } from './tasks/tasksSlice';
import { timerReducer } from './timer/timerSlice';
import { widgetsReducer } from './widgets/widgetsSlice';
import { userReducer } from './auth/users.slice';
import {usersApi} from './auth/users.api';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
    widgets: widgetsReducer,
    timerSettings: timerSettingsReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
