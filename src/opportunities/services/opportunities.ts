import { api } from '@/api';
import { Opportunity, TypeEnum } from '../interfaces/opportunity';

type OpportunitiesResponse = {
  status: string;
  payload: {
    data: {
      data: Opportunity[];
    };
    total: number;
  };
};

type OpportunityResponse = {
  status: string;
  payload: {
    data: Opportunity;
  };
};

export type Params = {
  pageSize: number;
  page: number;
  followed?: string;
  type?: TypeEnum;
  dateInit?: string;
  dateEnd?: string;
};

export const opportunitiesService = {
  getAll: async ({
    pageSize = 10,
    page = 1,
    followed,
    type,
    dateInit,
    dateEnd,
  }: Params) => {
    const { data } = await api.get<OpportunitiesResponse>(
      `/opportunities/page/${pageSize}/${page}`,
      {
        params: {
          followed: followed,
          type: type,
          dateInit: dateInit,
          dateEnd: dateEnd,
        },
      }
    );

    return data.payload.data.data;
  },
  update: async (id: number, opportunity: Partial<Opportunity>) => {
    const { data } = await api.patch<OpportunityResponse>(
      `/opportunities/${id}`,
      { data: opportunity }
    );

    return data.payload.data;
  },
};
