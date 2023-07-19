import { useEffect } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Email, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createGoogleAuthLink, getToken, newExpirationDate, tokenExpired } from './data/tokens';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  clearLoggedIn,
  setAccessToken,
  setExpirationDate,
  setLoggedIn,
  setRefreshToken,
} from '../../store/authReducer';

const SignUpOrLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenFromSessionStore();
  }, []);

  const handleContinueWithGoogle = () => {
    dispatch(createGoogleAuthLink());
  };

  const handleContinueWithEmail = () => {
    // Implement the logic for continuing with Email here
  };

  const handleTokenFromSessionStore = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      handleTokenFromQueryParams();
      return;
    }
    if (tokenExpired()) {
      try {
        const token = dispatch(getToken());
        if (!token) {
          dispatch(clearLoggedIn());
        } else {
          dispatch(setLoggedIn(true));
        }
      } catch (error) {
        dispatch(clearLoggedIn());
      }
    } else {
      dispatch(setLoggedIn(true));
    }
  };

  const handleTokenFromQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');
    const expirationDate = newExpirationDate();

    if (!accessToken || !refreshToken) {
      dispatch(clearLoggedIn());
      return;
    }
    storeTokenData(accessToken, refreshToken, expirationDate);
    navigate('/');
  };

  const storeTokenData = (token: string, refreshToken: string, expirationDate: Date) => {
    dispatch(setLoggedIn(true));
    dispatch(setRefreshToken(refreshToken));
    dispatch(setAccessToken(token));
    dispatch(setExpirationDate(expirationDate.toISOString()));
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('expirationDate', expirationDate.toISOString());
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '50vh' }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Sign Up or Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            onClick={handleContinueWithGoogle}
            startIcon={<Google />}
          >
            Continue with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ color: 'white' }}
            onClick={handleContinueWithEmail}
            startIcon={<Email />}
          >
            Continue with Email
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpOrLogin;
