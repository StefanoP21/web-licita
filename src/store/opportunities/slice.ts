import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: {
    from: null,
    to: null,
  },
  filters: {
    followed: null,
    type: null,
    dateInit: null,
    dateEnd: null,
    page: 1,
  },
  opportunities: [],
};

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.opportunities = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    reset: (state) => {
      state.date = {
        from: null,
        to: null,
      };
      state.filters = {
        followed: null,
        type: null,
        dateInit: null,
        dateEnd: null,
        page: 1,
      };
      state.opportunities = [];
    },
  },
});

export const { setOpportunities, setDate, setFilters, setPage, reset } =
  opportunitiesSlice.actions;
