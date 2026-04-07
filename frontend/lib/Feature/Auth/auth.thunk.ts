import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoginInfo, SignupInfo, User } from './auth.types'
import { fetchRequest, loginRequest, signupRequest } from './auth.api'

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      'An error occurred during the request.'
    )
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong'
}

export const createUser = createAsyncThunk<
  User,
  SignupInfo,
  { rejectValue: string }
>('auth/createUser', async (data, thunkAPI) => {
  try {
    return await signupRequest(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})


export const loginUser = createAsyncThunk<
  User,
  LoginInfo,
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    return await loginRequest(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUser", async (_, thunkAPI) => {
  try {
    return await fetchRequest();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});