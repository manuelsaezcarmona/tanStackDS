/* eslint-disable import/prefer-default-export */
import { ColumnDef } from '@tanstack/react-table';
import { IPrestayPromotion } from '../../../interfaces/PrestayPromotion';

export const grupoColumns: ColumnDef<IPrestayPromotion>[] = [
  {
    header: 'General Info',
    columns: [
      {
        accessorKey: 'conceptDescription',
        header: 'Nombre Campaña',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'partnerDescription',
        header: 'Nombre segun Partner',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'stateDescription',
        header: 'Status ',
        cell: (info) => info.getValue(),
      },
    ],
  },
  {
    header: 'Fechas',
    columns: [
      {
        accessorKey: 'creationDate',
        header: 'Creación',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'periodFrom',
        header: 'Desde',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'periodTo',
        header: 'Hasta',
        cell: (info) => info.getValue(),
      },
    ],
  },
];
