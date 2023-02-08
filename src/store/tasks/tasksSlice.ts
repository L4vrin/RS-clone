import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../models';
import { v4 as uuidv4 } from 'uuid';

const LS_TASKS_KEY = 'tasks';

interface TasksState {
  list: ITask[];
}

const initialState: TasksState = {
  list: JSON.parse(localStorage.getItem(LS_TASKS_KEY) ?? '[]'),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<ITask>) {
        state.list.push(action.payload);
        localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
      },
      prepare(title: string) {
        const currentDate = new Date();
        const newTask: ITask = {
          id: uuidv4(),
          createdAt: currentDate.getTime(),
          deadlineAt: Number(currentDate.setHours(23, 59, 59, 999)),
          isCompleted: false,
          pomodoroTime: 25,
          pomodorosNumber: 1,
          title: title,
        };

        return { payload: newTask };
      },
    },

    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTask = state.list.find((task) => task.id === action.payload);
      if (toggledTask) {
        toggledTask.isCompleted = !toggledTask.isCompleted;
        localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.list = state.list.filter((task) => task.id !== action.payload);
      localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
