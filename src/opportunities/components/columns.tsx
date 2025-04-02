import { ColumnDef } from '@tanstack/react-table';
import { Opportunity } from '../interfaces/opportunity';
import { OpportunityTypes } from '../constants.ts';

export const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type');
      const opportunityType = Object.values(OpportunityTypes).find(
        (t) => t.code === type
      );

      return (
        <span className="font-bold" style={{ color: opportunityType?.color }}>
          {opportunityType?.name}
        </span>
      );
    },
  },
  {
    accessorKey: 'is_followed',
    header: 'Seguido',
    cell: ({ row }) => {
      const followed = row.getValue('is_followed');
      return <span>{followed ? 'Sí' : 'No'}</span>;
    },
  },
  {
    accessorKey: 'publish_date',
    header: 'Fecha de publicación',
  },
  {
    accessorKey: 'close_date',
    header: 'Fecha de cierre',
  },
];
