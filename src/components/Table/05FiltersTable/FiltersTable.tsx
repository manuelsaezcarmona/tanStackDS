/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Cell, CellHeader, CheckBox } from '@flat101/componentes';
import { makeData } from '../../../data/makedata';
import { Person } from '../../../interfaces/Person';
import { filterTblColumns } from './filtersTbl.tablemodel';

export function FiltersTable() {
  // Nos traemos los datos y los guardamos en un estado
  const [data, setData] = useState<Person[]>(() => makeData(150));
  // Nos traemos el modelo de la tabla al tener complejidad vamos a memoizar el modelo
  const columns = useMemo(() => filterTblColumns, []);

  // Guardo en un estado la ordenacion de los registros para la tabla.
  const [sorting, setSorting] = useState<SortingState>([]);

  // Instanciamos la tabla. Minimo data columns y getCoreRowModel.

  /** Ordenacion de registros por columna
   *  se utiliza el metodo getco
   *
   */

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  console.log('columnas', columns);

  /*  {...{
    className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
    onClick: header.column.getToggleSortingHandler(),
  }} */

  return (
    <div id="visible-Table">
      <h2 className="inter-headline-01-bold">Filters Table</h2>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                //  console.log('header: ', header);
                console.log('getIsSorted', header.column.getIsSorted());
                return (
                  <th colSpan={header.colSpan} key={header.id}>
                    {/* <CellHeader
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      key={header.id}
                      label={
                        header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())
                      }
                      as="div"
                      onClick={() => header.column.getToggleSortingHandler}
                      sort={header.column.getIsSorted() ?? null}
                    /> */}
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getCoreRowModel().rows.map((row) => (
            // console.log('row', row);
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                //    console.log('cell', cell);
                <Cell size="M" zebra={false}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
