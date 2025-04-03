import { createColumns } from '../components/columns';
import { DataTable } from '../components/data-table';
import { TablePagination } from '../components/table-pagination';
import { useOpportunities } from '../hooks/useOpportunities';
import { Layout } from '../layout/Layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { opportunitiesService } from '../services/opportunities';
import { Button } from '@/components/ui/button';
import { LucideRefreshCcw } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InputPicker } from '../components/input-picker';
import { OpportunityTypes } from '../constants.ts';
import { useEffect } from 'react';
import {
  setOpportunities,
  setFilters,
  reset,
} from '@/store/opportunities/slice.ts';
import { TypeEnum } from '../interfaces/opportunity.ts';

export const Followed = () => {
  const { control } = useForm();
  const dispatch = useAppDispatch();
  const { opportunities, filters } = useAppSelector(
    (state) => state.opportunities
  );
  const { pageSize, page, type, dateInit, dateEnd } = filters;

  const { data, refetch, isFetching } = useOpportunities({
    pageSize,
    page,
    followed: 'true',
    type,
    dateInit,
    dateEnd,
  });

  const totalPages = Array.isArray(data) ? 0 : data?.totalPages || 0;
  const opportunitiesList = opportunities || [];

  const handleFollowOpportunity = async (opportunityId: number) => {
    await opportunitiesService
      .update(opportunityId, { is_followed: true })
      .then(() => refetch());
  };

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      dispatch(setOpportunities(data.data));
    }
  }, [data]);

  return (
    <Layout>
      <div className="py-2.5 space-y-4">
        <div className="flex justify-between">
          <div className="flex justify-start gap-4">
            <div className="flex gap-4 items-center">
              <div className="font-medium">Tipos</div>
              <div className="w-32">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value = type, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={(newValue: TypeEnum) => {
                        onChange(newValue);
                        dispatch(setFilters({ type: newValue }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue className="w-full" placeholder="Tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(OpportunityTypes).map((status) => (
                          <SelectItem key={status.code} value={status.code}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="font-medium flex flex-shrink-0">
                Filtrar por publicación
              </div>
              <InputPicker
                mode="range"
                date={{ from: dateInit, to: dateEnd }}
                onChange={(newDate) => {
                  dispatch(
                    setFilters({ dateInit: newDate.from, dateEnd: newDate.to })
                  );
                }}
              />
            </div>
            <div className="flex gap-4 items-center">
              <Button
                variant={'link'}
                className="cursor-pointer"
                onClick={() => dispatch(reset())}
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-end">
              <Button
                size="lg"
                className="cursor-pointer"
                variant="outline"
                onClick={() => refetch()}
              >
                Actualizar
                <LucideRefreshCcw
                  className={isFetching ? 'animate-spin' : ''}
                />
              </Button>
            </div>
          </div>
        </div>
        <DataTable
          columns={createColumns({ onFollow: handleFollowOpportunity })}
          data={opportunitiesList}
        />
        <TablePagination
          pages={totalPages}
          page={page}
          onChange={(page) => dispatch(setFilters({ page }))}
        />
      </div>
    </Layout>
  );
};
