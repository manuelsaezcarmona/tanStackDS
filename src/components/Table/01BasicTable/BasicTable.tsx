/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { Cell, CellHeader } from '@flat101/componentes';

import { promotionsPrestaydata } from '../../../data/prestayPromotion.data';
import { defaultColumns } from './example.tablemodel';

export function BasicTable() {
  // const columns = useMemo(() => [...defaultColumns], []);
  // const [columns] = useState(() => [...defaultColumns]);

  // Nos traemos los datos
  const [data, setData] = useState(promotionsPrestaydata);
  // Nos traemos el modelo de tabla las columnas, ojo debe de llamarse
  //  columns para que TanStack lo vea (Me traigo una copia mediante una funcion autoinvocada)
  const columns = (() => [...defaultColumns])();

  const rerender = () => setData(promotionsPrestaydata);

  // Imprescindible, el metodo getCoreRowModel()

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // console.log((() => [...defaultColumns])());
  console.log('Example getHeaders', tableInstance.getRowModel());

  return (
    <>
      <h2>BasicTable</h2>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headergroup) => (
            <tr key={headergroup.id}>
              {headergroup.headers.map((header) => (
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
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Cell as="td" size="M" zebra={false}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
