import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { useDispatch } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer, // Replace 'auth' with the actual slice name for authentication in your app
  // Add other reducers here if needed
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // Export RootState type
export type AppDispatch = typeof store.dispatch; // Export AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;