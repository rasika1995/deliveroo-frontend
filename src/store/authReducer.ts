import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expirationDate: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  expirationDate: null,
};

// Load isLoggedIn from session storage during initialization
const isLoggedInFromSession = sessionStorage.getItem('isLoggedIn');
const isAccessTokenFromSession = sessionStorage.getItem('accessToken');
const isRefreshTokenFromSession = sessionStorage.getItem('refreshToken');
const isExpirationDateFromSession = sessionStorage.getItem('expirationDate');

if (isLoggedInFromSession) {
  initialState.isLoggedIn = JSON.parse(isLoggedInFromSession);
}

if (isAccessTokenFromSession) {
  initialState.accessToken = isAccessTokenFromSession;
}

if (isRefreshTokenFromSession) {
  initialState.refreshToken = isRefreshTokenFromSession;
}

if (isExpirationDateFromSession) {
  initialState.expirationDate = isExpirationDateFromSession;
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
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setExpirationDate: (state, action: PayloadAction<string | null>) => {
      state.expirationDate = action.payload;
    },
    clearLoggedIn: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.expirationDate = null;
    },
  },
});

export const { setLoggedIn, setAccessToken, setRefreshToken, setExpirationDate, clearLoggedIn } =
  authSlice.actions;

// export const clearLoggedIn = () => setLoggedIn(false);
export default authSlice.reducer;
