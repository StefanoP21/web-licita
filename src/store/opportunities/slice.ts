import { Opportunity, TypeEnum } from '@/opportunities/interfaces/opportunity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  filters: {
    followed?: string | undefined;
    type?: TypeEnum | undefined;
    dateInit?: Date | undefined;
    dateEnd?: Date | undefined;
    pageSize: number;
    page: number;
  };
  opportunities: Opportunity[];
}

const initialState: InitialState = {
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
    setFilters: (
      state,
      action: PayloadAction<{
        followed?: string;
        type?: TypeEnum;
        dateInit?: Date;
        dateEnd?: Date;
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

export const { setOpportunities, setFilters, setPage, reset } =
  opportunitiesSlice.actions;
