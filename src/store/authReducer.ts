import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './types';
import axios from 'axios';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
};

// Load isLoggedIn from session storage during initialization
const isLoggedInFromSession = sessionStorage.getItem('isLoggedIn');
if (isLoggedInFromSession) {
  initialState.isLoggedIn = JSON.parse(isLoggedInFromSession);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      console.log('setLoggedIn action called with value:', action.payload);
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    clearLoggedIn: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

export const { setLoggedIn, setAccessToken } = authSlice.actions;

// Add these two lines:
export const clearLoggedIn = () => setLoggedIn(false);
export default authSlice.reducer;
