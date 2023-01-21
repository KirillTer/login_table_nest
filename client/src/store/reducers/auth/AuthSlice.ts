import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';
import { authUser } from './ActionCreators';

export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

interface UserState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
  error: '',
}

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthLogout(state: UserState) {
      state.isLoading = false;
      state.error = "";
      state.user = {} as IUser;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [authUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [authUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
      state.isAuth = true;
    },
    [authUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;