import { ColumnDef } from '@tanstack/react-table';
import { Opportunity } from '../interfaces/opportunity';
import { OpportunityTypes } from '../constants.ts';
import { Button } from '@/components/ui/button.tsx';

interface Props {
  onFollow: (opportunityId: number) => Promise<void>;
  columnVisibility?: Record<string, boolean>;
}

export const createColumns = ({
  onFollow,
  columnVisibility = {},
}: Props): ColumnDef<Opportunity>[] => {
  // Create base columns
  const columns: ColumnDef<Opportunity>[] = [
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

  if (columnVisibility.actions) {
    columns.push({
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const id = Number(row.getValue('id'));
        const followed = row.getValue('is_followed');
        return (
          <Button
            variant={'outline'}
            className="cursor-pointer"
            disabled={!!followed}
            onClick={() => onFollow(id)}
          >
            Seguir
          </Button>
        );
      },
    });
  }

  return columns;
};
