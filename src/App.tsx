import React, { Suspense } from 'react';
import './App.css';

// import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleAuth from './google-auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#17CFBB',
    },
    secondary: {
      main: '#AF0606',
    },
  },
});

const Dashboard = React.lazy(() => import('./components/Dashboard'));
const SignUpOrLogin = React.lazy(() => import('./components/SignUpOrLogin'));

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sign-up-or-login" element={<SignUpOrLogin />} />
              {/* Add other routes here */}
            </Routes>
          </Suspense>
        </Router>
        {/* <Dashboard /> */}
      </ThemeProvider>

      {/* <GoogleOAuthProvider clientId="800323243395-5qdnl1g865deebskcjvsfiqp3g61q33o.apps.googleusercontent.com">
          <GoogleAuth />
        </GoogleOAuthProvider>  */}
    </React.Fragment>
  );
}

export default App;
