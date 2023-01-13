import { ColumnDef } from '@tanstack/react-table';
import { Person } from '../../../interfaces/Person';

export const filterTblColumns: ColumnDef<Person, any>[] = [
  {
    header: 'Personal',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        header: 'Nombre',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Apellidos</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Nombre Completo',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Edad',
        footer: (props) => props.column.id,
      },
      {
        header: 'Estadisticas',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visitas</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Situacion',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Progreso',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];
