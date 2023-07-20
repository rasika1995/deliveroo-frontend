import { ThunkAction } from 'redux-thunk';
import { RootState, AppDispatch } from './store'; // Import your custom AppDispatch type
import { Action } from '@reduxjs/toolkit';

// Modify the AppThunk type to use AppDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
