import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from './auth.types'
import { createUser, fetchUser, loginUser } from './auth.thunk'

const initialState: AuthState = {
  user: null,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,

  isFetchUserDataLoading: false,
  isFetchUserDataError: false,
  isFetchUserDataSuccess: false,

  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false,

  errorMessage: undefined

}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    userSliceReset: state => {
      state.isLoginLoading = false
      state.isLoginError = false
      state.isLoginSuccess = false

      state.isFetchUserDataLoading = false
      state.isFetchUserDataError = false
      state.isFetchUserDataSuccess = false

      state.isCreateUserLoading = false
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
    },
    logout: () => {
      return { ...initialState }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state,action:PayloadAction<User>) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.user = action.payload
      })
      .addCase(createUser.rejected, state => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action:PayloadAction<User>) => {
        state.isLoginLoading = false
        state.isLoginError = false
        state.isLoginSuccess = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, state => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(fetchUser.pending, state => {
        state.isFetchUserDataLoading = true
        state.isFetchUserDataError = false
        state.isFetchUserDataSuccess = false
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isFetchUserDataLoading = false
        state.isFetchUserDataError = false
        state.isFetchUserDataSuccess = true
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, state => {
        state.isFetchUserDataLoading = false
        state.isFetchUserDataError = true
        state.isFetchUserDataSuccess = false
      })
  }
})

export const { userSliceReset, logout } = authSlice.actions

export default authSlice.reducer
