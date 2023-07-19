import { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Email, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, newExpirationDate, tokenExpired } from './Google-login/tokens';

const SignUpOrLogin = () => {
  const handleContinueWithGoogle = () => {

    // Implement the logic for continuing with Google here
  };

  const handleContinueWithEmail = () => {
    // Implement the logic for continuing with Email here
  };

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    handleTokenFromSessionStore();
  }, []);

   // Implement the logic for continuing with Google here
  const createGoogleAuthLink = async () => {
    try {
      const response = await axios.get('http://localhost:8080/createAuthLink');
      console.log(response)
      window.location.href = response.data.url;
    } catch (error: any) {
      console.log('error', error);
      throw new Error('Issue with Login', error.message);
    }
  };

  const handleTokenFromSessionStore = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(accessToken);
    if (!accessToken) {
      handleTokenFromQueryParams();
      return;
    }
    if (tokenExpired()) {
      const token = await getToken();
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
    }
    setIsLoggedIn(true);
  };

  const handleTokenFromQueryParams = () => {
    console.log('test');
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');
    const expirationDate = newExpirationDate();

    if (!accessToken || !refreshToken) {
      setIsLoggedIn(false);
      return;
    }
    storeTokenData(accessToken, refreshToken, expirationDate);
    setIsLoggedIn(true);
    // navigate('/');
    window.location.href = 'http://localhost:3000/';
  };

  const storeTokenData = (token: string, refreshToken: string, expirationDate: Date) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('expirationDate', expirationDate.toISOString());
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
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
              onClick={createGoogleAuthLink}
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
