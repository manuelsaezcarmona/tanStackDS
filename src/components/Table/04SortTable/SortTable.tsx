/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import { Icon } from '@flat101/componentes';
import {
  getCoreRowModel,
  SortingState,
  useReactTable,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { makeData } from '../../../data/makedata';
import { Person } from '../../../interfaces/Person';
import { sortTblColumns } from './SortTbl.tablemodel';

export function SortTable() {
  // Nos traemos los datos y los guardamos en un estado
  const [data, setData] = useState(() => makeData(50));

  // Nos traemos las columnas
  const [columns] = useState(() => sortTblColumns);

  // Creamos un estado para la ordenacion.
  const [sorting, setSorting] = useState<SortingState>([]);

  /* Instanciamos una tabla usan el hook useReactTable, nos traemos los metodos que nos interesan. */

  // A este hook le pasamos el estado de las propiedades de la tabla que necesitamos para darle funcionalidad
  // Este state de la tabla ya tiene definidas propiedades que se las iremos pasando a traves de los diferentes estados

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    debugTable: true,
  });

  const sortIcon = (sort: string | boolean) => {
    if (sort === 'asc') return <Icon name="thumb_up" />;
    if (sort === 'desc') return <Icon name="thumb_down" />;

    return <Icon name="thumbs_up_down" />;
  };

  return (
    <>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {/*  {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null} */}
                      {sortIcon(header.column.getIsSorted())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </>
  );
}
