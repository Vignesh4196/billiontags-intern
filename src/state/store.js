import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import supportReducer from './supportSlice';
import accountReducer from './accountSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    support: supportReducer,
    account: accountReducer,
  },
});
