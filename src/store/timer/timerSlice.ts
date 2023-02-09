import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../models';

interface TimerState {
  currentTask: ITask | null;
}

const initialState: TimerState = {
  currentTask: null,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTaskToTimer(state, action: PayloadAction<ITask>) {
      state.currentTask = action.payload;
    },

    removeTaskFromTimer(state) {
      state.currentTask = null;
    },
  },
});

export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
