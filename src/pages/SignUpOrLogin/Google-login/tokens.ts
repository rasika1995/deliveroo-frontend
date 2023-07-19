import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../../store/types';

export const newExpirationDate = (): Date => {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  return expiration;
};

export const tokenExpired = (): boolean => {
  const now = Date.now();
  const expirationDate = sessionStorage.getItem('expirationDate');

  if (!expirationDate) {
    return false;
  }

  const expDate = new Date(expirationDate);
  return now > expDate.getTime();
};

export const createGoogleAuthLink = (): AppThunk => async (dispatch: any) => {
  try {
    const response = await axios.get('http://localhost:8080/createAuthLink');
    window.location.href = response.data.url;
  } catch (error: any) {
    console.log('error', error);
    throw new Error('Issue with Login', error.message);
  }
};

export const getValidTokenFromServer = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  // get new token from server with refresh token
  try {
    const response = await axios.post('http://localhost:8080/getValidToken', {
      refreshToken: refreshToken,
    });

    return response.data;
  } catch (error: any) {
    throw new Error('Issue getting new token', error.message);
  }
};
// Function to get a new token using the refresh token
export const getToken = createAsyncThunk<string | null, void>('auth/getToken', async (_, thunkAPI) => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post('http://localhost:8080/getValidToken', { refreshToken });
    const accessToken = response.data.accessToken;
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
});
