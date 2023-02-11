import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerSettingsState {
  workPeriodInMinutes: number;
  shortBreakPeriodInMinutes: number;
  longBreakPeriodInMinutes: number;
  longBreakInterval: number;
  autoRunWork: boolean;
  autoRunBreak: boolean;
  offBreak: boolean;
}

const initialState: TimerSettingsState = {
  workPeriodInMinutes: 2,
  shortBreakPeriodInMinutes: 1,
  longBreakPeriodInMinutes: 3,
  longBreakInterval: 4,
  autoRunWork: true,
  autoRunBreak: true,
  offBreak: false,
};

export const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    setWorkPeriod(state, action: PayloadAction<number | string>) {
      state.workPeriodInMinutes = Number(action.payload);
    },

    setShortBreakPeriod(state, action: PayloadAction<number | string>) {
      state.shortBreakPeriodInMinutes = Number(action.payload);
    },

    setTimerSettings(state, action: PayloadAction<Partial<TimerSettingsState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const timerSettingsActions = timerSettingsSlice.actions;
export const timerSettingsReducer = timerSettingsSlice.reducer;
