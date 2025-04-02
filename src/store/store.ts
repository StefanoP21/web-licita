import { configureStore } from '@reduxjs/toolkit';
import { opportunitiesSlice } from './opportunities/slice';

export const store = configureStore({
  reducer: {
    opportunities: opportunitiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
