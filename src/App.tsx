import React, { Suspense, useEffect } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from './store/store';
import { checkTokenExpiration } from './store/authThunk';

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

console.log(store.getState());
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SignUpOrLogin = React.lazy(() => import('./pages/SignUpOrLogin'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check token expiration when the application starts
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}
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
      </ThemeProvider>
      {/* </Provider> */}
    </React.StrictMode>
  );
}

export default App;
