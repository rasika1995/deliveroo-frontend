import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { useDispatch } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>; // Export RootState type
export type AppDispatch = typeof store.dispatch; // Export AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
