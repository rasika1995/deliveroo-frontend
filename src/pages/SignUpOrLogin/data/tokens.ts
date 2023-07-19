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

// Function to get a new token using the refresh token
export const createGoogleAuthLink = (): AppThunk => async (dispatch: any) => {
  try {
    const response = await axios.get('http://localhost:8080/createAuthLink');
    window.location.href = response.data.url;
  } catch (error: any) {
    console.log('error', error);
    throw new Error('Issue with Login', error.message);
  }
};

// Function to get a new token using the refresh token
export const getToken = (): AppThunk<Promise<string | null>> => async (dispatch: any) => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post('http://localhost:8080/getValidToken', { refreshToken });

    const accessToken = response.data.data.accessToken;
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
