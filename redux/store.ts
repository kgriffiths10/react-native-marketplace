// store.ts
import { configureStore } from '@reduxjs/toolkit';
import boostCoinsReducer from '@/redux/slices/boostCoinsSlice';

export const store = configureStore({
  reducer: {
    boostCoins: boostCoinsReducer,
  },
});