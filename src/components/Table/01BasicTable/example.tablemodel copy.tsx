/* eslint-disable import/prefer-default-export */
import { ColumnDef } from '@tanstack/react-table';
import { IPrestayPromotion } from '../../../interfaces/PrestayPromotion';

export const defaultColumns: ColumnDef<IPrestayPromotion>[] = [
  {
    header: 'Prestay',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'conceptCode',
        header: 'Código',
        cell: (data) => data.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'conceptDescription',
        header: 'Nombre de PRomoción',
        cell: (data) => data.getValue(),
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'concepts',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'categoryDescription',
        header: 'Categoria',
        cell: (data) => data.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'categoryCode',
        header: 'Codigo',
        cell: (data) => data.getValue(),
        footer: (props) => props.column.id,
      },
    ],
  },
];
