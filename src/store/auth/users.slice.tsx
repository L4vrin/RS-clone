import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models";

const LS_USER_KEY = 'user';

const initialState: IUser = {
  fullName: JSON.parse(localStorage.getItem(LS_USER_KEY) ?? '[]'),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      changeUserName(state, action: PayloadAction<string>) {
        state.fullName = action.payload;
        localStorage.setItem(LS_USER_KEY, JSON.stringify(state.fullName));
      }
  }
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;