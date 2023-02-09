import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerSettingsState {
  workPeriodInMinutes: number;
  breakPeriodInMinutes: number;
}

const initialState: TimerSettingsState = {
  workPeriodInMinutes: 2,
  breakPeriodInMinutes: 1,
};

export const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    setWorkPeriod(state, action: PayloadAction<number>) {
      state.workPeriodInMinutes = action.payload;
    },

    setRestPeriod(state, action: PayloadAction<number>) {
      state.breakPeriodInMinutes = action.payload;
    },
  },
});

export const timerSettingsActions = timerSettingsSlice.actions;
export const timerSettingsReducer = timerSettingsSlice.reducer;
