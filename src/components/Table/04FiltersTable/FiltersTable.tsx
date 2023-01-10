/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Cell, CellHeader, CheckBox } from '@flat101/componentes';
import { makeData } from '../../../data/makedata';
import { Person } from '../../../interfaces/Person';
import { filterTblColumns } from './filtersTbl.tablemodel';

export function FiltersTable() {
  // Nos traemos los datos y los guardamos en un estado
  const [data, setData] = useState<Person[]>(() => makeData(150));
  // Nos traemos el modelo de la tabla al tener complejidad vamos a memoizar el modelo
  const columns = useMemo(() => filterTblColumns, []);

  // Instanciamos la tabla. Minimo data columns y getCoreRowModel.

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log('columnas', columns);

  return (
    <div id="visible-Table">
      <h2 className="inter-headline-01-bold">Filters Table</h2>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                console.log('header: ', header);
                return (
                  <th colSpan={header.colSpan}>
                    <CellHeader
                      key={header.id}
                      label={
                        header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())
                      }
                      as="div"
                    />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getCoreRowModel().rows.map((row) => {
            console.log('row', row);
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  console.log('cell', cell);
                  return (
                    <Cell size="M" zebra={false}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Cell>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
