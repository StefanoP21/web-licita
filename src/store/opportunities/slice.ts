import { Opportunity, TypeEnum } from '@/opportunities/interfaces/opportunity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  date: {
    from: string | undefined;
    to: string | undefined;
  };
  filters: {
    followed?: string | undefined;
    type?: TypeEnum | undefined;
    dateInit?: string | undefined;
    dateEnd?: string | undefined;
    pageSize: number;
    page: number;
  };
  opportunities: any[];
}

const initialState: InitialState = {
  date: {
    from: undefined,
    to: undefined,
  },
  filters: {
    followed: undefined,
    type: undefined,
    dateInit: undefined,
    dateEnd: undefined,
    pageSize: 10,
    page: 1,
  },
  opportunities: [],
} satisfies InitialState as InitialState;

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setOpportunities: (state, action: PayloadAction<Opportunity[]>) => {
      state.opportunities = action.payload;
    },
    setDate: (state, action: PayloadAction<{ from: string; to: string }>) => {
      state.date = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        followed?: string;
        type?: TypeEnum;
        dateInit?: string;
        dateEnd?: string;
        pageSize?: number;
        page?: number;
      }>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    reset: (state) => {
      state.date = {
        from: undefined,
        to: undefined,
      };
      state.filters = {
        followed: undefined,
        type: undefined,
        dateInit: undefined,
        dateEnd: undefined,
        pageSize: 10,
        page: 1,
      };
      state.opportunities = [];
    },
  },
});

export const { setOpportunities, setDate, setFilters, setPage, reset } =
  opportunitiesSlice.actions;
