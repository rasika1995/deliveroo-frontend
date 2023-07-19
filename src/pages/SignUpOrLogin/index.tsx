import { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Email, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createGoogleAuthLink, getToken, newExpirationDate, tokenExpired } from './Google-login/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearLoggedIn, setLoggedIn } from '../../store/authReducer';

const SignUpOrLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenFromSessionStore();
  }, []);

   const handleContinueWithGoogle = () => {
    dispatch(createGoogleAuthLink()); // Dispatch the Thunk action to create Google auth link
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
        const token = await dispatch(getToken());
        if (!token) {
          dispatch(clearLoggedIn());
        } else {
          console.log("TEST")
          dispatch(setLoggedIn(true));
        }
      } catch (error) {
        dispatch(clearLoggedIn());
      }
    } else {
      console.log("TEST 3")
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
    dispatch(setLoggedIn(true));
    storeTokenData(accessToken, refreshToken, expirationDate);
    navigate('/');
    // window.location.href = 'http://localhost:3000/';
  };

  const storeTokenData = (token: string, refreshToken: string, expirationDate: Date) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('expirationDate', expirationDate.toISOString());
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  return (
      <Container maxWidth="xs">
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
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
            <Button fullWidth variant="contained" color="primary" style={{color: 'white' }}onClick={handleContinueWithEmail} startIcon={<Email />}>
              Continue with Email
            </Button>
          </Grid>
        </Grid>
      </Container>
  );
};

export default SignUpOrLogin;
