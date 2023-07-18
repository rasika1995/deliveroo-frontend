import React, { useState, useEffect } from 'react';
import { getToken, newExpirationDate, tokenExpired } from './tokens';
import axios from 'axios';

function GoogleAuthLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    handleTokenFromSessionStore();
  }, []);

  const createGoogleAuthLink = async () => {
    try {
      const response = await axios.post('http://localhost:8080/createAuthLink');
      window.location.href = response.data.url;
    } catch (error: any) {
      console.log('error', error);
      throw new Error('Issue with Login', error.message);
    }
  };

  const handleTokenFromSessionStore = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
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
    <div>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      <h1>Google</h1>
      {!isLoggedIn ? (
        <button onClick={createGoogleAuthLink}>Login</button>
      ) : (
        <>
          Successfully Login to the system
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export default GoogleAuthLogin;
