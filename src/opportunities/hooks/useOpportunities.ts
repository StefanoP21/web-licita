import { useQuery } from '@tanstack/react-query';
import { opportunitiesService, Params } from '../services/opportunities';

export const useOpportunities = ({
  pageSize,
  page,
  followed,
  type,
  dateInit,
  dateEnd,
}: Params) => {
  const {
    isLoading,
    isError,
    error,
    data: opportunities = [],
    isFetching,
  } = useQuery({
    queryKey: [
      'opportunities',
      { pageSize, page, followed, type, dateInit, dateEnd },
    ],
    queryFn: () =>
      opportunitiesService.getAll({
        pageSize,
        page,
        followed,
        type,
        dateInit,
        dateEnd,
      }),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    opportunities,
    isFetching,
  };
};
