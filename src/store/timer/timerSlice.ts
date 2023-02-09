import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../models';

interface TimerState {
  currentTask: ITask | null;
  isRunning: boolean;
}

const initialState: TimerState = {
  currentTask: null,
  isRunning: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTaskToTimer(state, action: PayloadAction<ITask>) {
      state.currentTask = action.payload;
      state.isRunning = true;
    },

    removeTaskFromTimer(state, action: PayloadAction<string>) {
      if (state.currentTask) {
        if (action.payload !== state.currentTask.id) return;
      }
      state.currentTask = null;
    },

    setIsRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
