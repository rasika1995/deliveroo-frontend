import { AppThunk } from './types';
import { setAccessToken, setLoggedIn, setExpirationDate } from './authReducer';
import { getToken } from '../pages/SignUpOrLogin/data/tokens';
import { RootState } from './store';

export const checkTokenExpiration =
  (): AppThunk => async (dispatch: any, getState: () => RootState) => {
    const { accessToken, expirationDate, refreshToken } = getState().auth;

    if (!accessToken || !refreshToken || !expirationDate) {
      // No token or expiration date, user is not logged in
      dispatch(setLoggedIn(false));
      return;
    }

    const now = new Date();
    const isTokenExpired = now > new Date(expirationDate);

    if (isTokenExpired) {
      try {
        const newToken = await dispatch(getToken());

        if (newToken && newToken.accessToken) {
          dispatch(setAccessToken(newToken.accessToken));
          // Update the expiration date to a new value (e.g., add an hour)
          const newExpirationDate = new Date();
          newExpirationDate.setHours(newExpirationDate.getHours() + 1);
          dispatch(setExpirationDate(newExpirationDate.toISOString()));
        } else {
          dispatch(setLoggedIn(false));
        }
      } catch (error) {
        dispatch(setLoggedIn(false));
      }
    } else {
      dispatch(setLoggedIn(true));
    }
  };
