import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { fetchUser, loginUser, registerUser, updateUser } from './userThunks';

type TAuthSliceState = {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  isLoading: boolean;
  error?: string;
};

const initialState: TAuthSliceState = {
  refreshToken: '',
  accessToken: '',
  user: null,
  isLoading: false,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserError: (sliceState) => sliceState.error,
    getUser: (sliceState) => sliceState.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      });
  }
});

export const { getUserError, getUser } = userSlice.selectors;
