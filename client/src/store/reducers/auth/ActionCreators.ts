import axios from 'axios';
// import { AppDispatch } from '../store';
import { IUser } from '../../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';

// common redux action creator
// export const authUser = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
//     dispatch(userSlice.actions.usersFetchingSucccess(response.data));
//   } catch(e: any) {
//     dispatch(userSlice.actions.usersFetchingError(e.message));
//   }
// }

// redux toolkit action creator
export const authUser = createAsyncThunk(
  'user/authUser',
  async (reqParams: any = {username: '', password: ''}, thunkAPI) => {
    try {
      const response = await axios.post<IUser[]>(
        'https://jsonplaceholder.typicode.com/users', {
          params: {
            username: reqParams.username,
            password: reqParams.password
          }
        }
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
