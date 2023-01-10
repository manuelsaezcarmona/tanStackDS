/* eslint-disable import/prefer-default-export */
import { CellText } from '@flat101/componentes';
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
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Estado</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('category', {
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Categoria</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('creationdate', {
    id: 'fechaCreacion',
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Fecha de Creacion</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('expirationdate', {
    cell: (info) => info.getValue(),
    header: () => <CellText size="M">Fecha de Finalización</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('name', {
    id: 'promotionName',
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Nombre</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('partner', {
    id: 'partnerCode',
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Proveedor</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('concept', {
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Concepto</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('code', {
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Código</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
  columnHelper.accessor('points', {
    cell: (info) => <CellText size="M">{info.getValue()}</CellText>,
    header: () => <CellText size="M">Puntos</CellText>,
    footer: (info) => <CellText size="M">{info.column.id}</CellText>,
  }),
];
