import React, { Suspense } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store here

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
  return (
    <React.StrictMode>
      <Provider store={store}>
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
      </Provider>
      </React.StrictMode>
  );
}

export default App;
