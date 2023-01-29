import axios from 'axios';
// import { AppDispatch } from '../store';
import { IUser } from '../../../models/IUser';
// import { IAuthResponse } from '../../../models/IAuthResponse';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const API_URL = 'https://localhost:5001/auth/login'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

export default $api;

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
  async (reqParams: any = {email: '', password: ''}, thunkAPI) => {
    try {
      const response = await axios.post<IUser[]>(
        'http://localhost:5001/auth/login', {
          email: reqParams.email,
          password: reqParams.password
        }
      );
      console.log('resp', response);
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
