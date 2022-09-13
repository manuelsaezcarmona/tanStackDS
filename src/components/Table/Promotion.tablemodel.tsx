/* eslint-disable import/prefer-default-export */
import { createColumnHelper } from '@tanstack/react-table';

export type Promotion = {
  state: string;
  category: string;
  creationdate: string;
  expirationdate: string;
  name: string;
  partner: string;
  concept: string;
  code: string;
  points: string;
};

export const columnHelper = createColumnHelper<Promotion>();

export const columns = [
  columnHelper.accessor('state', {
    cell: (info) => info.getValue(),
    header: () => <span>Estado</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category', {
    cell: (info) => info.getValue(),
    header: () => <span>Categoria</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('creationdate', {
    id: 'fechaCreacion',
    cell: (info) => info.getValue(),
    header: () => <span>Fecha de Creacion</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('expirationdate', {
    cell: (info) => info.getValue(),
    header: () => <span>Fecha de Finalización</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    id: 'promotionName',
    cell: (info) => info.getValue(),
    header: () => <span>Nombre</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('partner', {
    id: 'partnerCode',
    cell: (info) => info.getValue(),
    header: () => <span>Proveedor</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('concept', {
    cell: (info) => info.getValue(),
    header: () => <span>Concepto</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('code', {
    cell: (info) => info.getValue(),
    header: () => <span>Codigo</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('points', {
    cell: (info) => info.getValue(),
    header: () => <span>Codigo</span>,
    footer: (info) => info.column.id,
  }),
];
