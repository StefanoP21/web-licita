import { api } from '@/api';
import { Opportunity, TypeEnum } from '../interfaces/opportunity';

type OpportunitiesResponse = {
  status: string;
  payload: {
    data: {
      data: Opportunity[];
      totalPages: number;
    };
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
  dateInit?: Date;
  dateEnd?: Date;
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

    return data.payload.data;
  },
  update: async (id: number, opportunity: Partial<Opportunity>) => {
    const { data } = await api.patch<OpportunityResponse>(
      `/opportunities/${id}`,
      opportunity
    );

    return data.payload.data;
  },
};
