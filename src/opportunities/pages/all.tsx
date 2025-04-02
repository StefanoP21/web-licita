import { columns } from '../components/columns';
import { DataTable } from '../components/data-table';
import { TablePagination } from '../components/table-pagination';
import { useOpportunities } from '../hooks/useOpportunities';
import { Layout } from '../layout/Layout';
import { useAppDispatch, useAppSelector } from '@/hooks';

export const All = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.opportunities);
  const { pageSize, page, followed, type, dateInit, dateEnd } = filters;

  const { opportunities } = useOpportunities({
    pageSize,
    page,
    followed,
    type,
    dateInit,
    dateEnd,
  });

  return (
    <Layout>
      <div className="py-2.5">
        <DataTable columns={columns} data={opportunities} />
        <TablePagination />
      </div>
    </Layout>
  );
};
