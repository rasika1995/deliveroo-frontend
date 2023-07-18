import React from 'react';
import './App.css';

// import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleAuth from './google-auth';
import Dashboard from './components/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>

      {/* <GoogleOAuthProvider clientId="800323243395-5qdnl1g865deebskcjvsfiqp3g61q33o.apps.googleusercontent.com">
          <GoogleAuth />
        </GoogleOAuthProvider>  */}
    </React.Fragment>
  );
}

export default App;
