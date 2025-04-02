import { configureStore } from '@reduxjs/toolkit';
import { opportunitiesSlice } from './opportunities/slice';

export const store = configureStore({
  reducer: {
    opportunities: opportunitiesSlice.reducer,
  },
});
