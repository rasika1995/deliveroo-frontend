import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer, // Replace 'auth' with the actual slice name for authentication in your app
});

export default rootReducer;
