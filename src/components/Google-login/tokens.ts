import axios from 'axios';

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

// export const getValidTokenFromServer = async (refreshToken: string): Promise<{ accessToken: string }> => {
//     console.log("CallGetNewToken")
//     // get new token from server with refresh token
//     try {
//       const request = await fetch("http://localhost:8080/getValidToken", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           refreshToken: refreshToken,
//         }),
//       });
//       const token = await request.json();
//       return token;
//     } catch (error: any) {
//       throw new Error("Issue getting new token", error.message);
//     }
//   };

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

export const getToken = async (): Promise<string | null> => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (refreshToken) {
      const newTokenObj = await getValidTokenFromServer(refreshToken);
      sessionStorage.setItem('accessToken', newTokenObj.accessToken);
      sessionStorage.setItem('expirationDate', newExpirationDate().toISOString());
      return newTokenObj.accessToken;
    }
    return null;
  } catch (error: any) {
    throw new Error('Issue getting valid token from refresh token', error.message);
  }
};
