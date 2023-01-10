/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/** 1 - Creamos un tipo conforme queremos que sea la fila (muy similar a un modelo de datos */

import { Cell, CellHeader } from '@flat101/componentes';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { promotions } from './promotion.data';

import { columns } from './Promotion.tablemodel';

export function PromotionTable() {
  const [data, setData] = useState([...promotions]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="tabla">
      <thead>
        {table.getHeaderGroups().map((headergroup) => (
          <tr key={headergroup.id} className="head-row">
            {headergroup.headers.map((header) => (
              <Cell key={header.id} size="M" className="celda" zebra={false}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </Cell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, indexRow) => (
          <tr key={row.id} className="row">
            {row.getVisibleCells().map((cell) => (
              <Cell key={cell.id} size="M" zebra={indexRow % 2 !== 0} className="celda">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id} className="footer-row">
            {footerGroup.headers.map((header) => (
              <Cell key={header.id} size="M" zebra={false} className="celda">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </Cell>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
