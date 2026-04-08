import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CreateESGInput, ESGRecords } from './emission.types'
import { createESGRequest } from './emission.api'

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


export const createESGRecord = createAsyncThunk<
    ESGRecords,
    CreateESGInput,
    { rejectValue: string }
>('emissions/createESGRecord', async (data, thunkAPI) => {
    try {
        return await createESGRequest(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
})

export const fetchESGRecords = createAsyncThunk<
    ESGRecords[],
    void,
    { rejectValue: string }
>('emissions/fetchESGRecords', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/esg-reports')
        return response.data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
})