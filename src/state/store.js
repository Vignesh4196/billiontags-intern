import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import supportReducer from './supportSlice';
import accountReducer from './accountSlice';
import aiWardrobeReducer from '../../Fits/ai_wardrobe/state/aiWardrobeSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    support: supportReducer,
    account: accountReducer,
    aiWardrobe: aiWardrobeReducer,
  },
});
