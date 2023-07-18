import { useState } from 'react';
// import axios, { AxiosResponse } from 'axios';
import { GoogleLogin } from '@react-oauth/google';

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

function GoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const onSuccess = async (credentialResponse: any) => {
    // try {
    //   const result: AxiosResponse<AuthResponse> = await axios.post("/login/", {
    //     token: credentialResponse.credential
    //   });
    //   console.log(result)
    //   setUser(result.data.user);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default GoogleAuth;
