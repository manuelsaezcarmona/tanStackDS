/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { ActionButton, CellHeader, Cell } from '@flat101/componentes';
import { ColumnOrderState, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { promotionsPrestaydata } from '../../../data/prestayPromotion.data';
import { grupoColumns } from '../02VisibleTable/grupoTbl.tablemodel';

export function OrderTable() {
  // Nos traemos los datos y los guardamos en un estado
  const [data, setData] = useState(promotionsPrestaydata);

  /* AHora las columnas no se encuentran fijas, usamos otro estado. Las necesitamos para
    almacenar el orden de columnas pues tanstack lo realiza siguiendo un array de las columnas
  */
  const [columns] = useState(() => [...grupoColumns]);

  /** Ordenar columnas podemos cambiar el orden de las columnas con un estado de orden de columnas
   * TanStack tiene un tipo para controlar este estado
   * El orden de columna es un array de strings con los ids de cada columna definidos en el modelo (columnDef)
   * ej : ordencolumna = ['idColumna1, 'idColumna2']
   * (NOTA podemos usar el metodo splice para ordenar)
   * let swap = (val1, val2, arr) => {
      if(!arr.includes(val1) || !arr.includes(val2)) return;
      let val1_index = arr.indexOf(val1);
      let val2_index = arr.indexOf(val2);
      arr.splice(val1_index, 1, val2);
    arr.splice(val2_index, 1, val1);
  }
let estudiantes = ['Juan', 'Luis', 'Mario','Jessica', 'Marcos'];
swap('Luis', 'Jessica', estudiantes);
console.log(estudiantes)
   *
   * De esa manera se renderiza siguiente este array
   * Tambien podemos colocar las columnas a la derecha y a la izquierda. La estructura se encuentra en un objeto.
   *  {
         "left": [
            "status",
            "progress"
          ],
          "right": [
            "lastName",
            "firstName",
            "age",
            "visits"
          ]
      }
   */

  const [columnaOrder, setColumnaOrder] = useState<ColumnOrderState>([]);

  const moveColumnToRight = (columnKey: string, columnOrder: ColumnOrderState) => {
    const newColumOrder = [...columnOrder];
    const indexColumn = newColumOrder.indexOf(columnKey);
    newColumOrder.splice(indexColumn, 1);
    newColumOrder.splice(indexColumn + 1, 0, columnKey);
    return newColumOrder;
  };

  const moveColumnToLeft = (columnKey: string, columnOrder: ColumnOrderState) => {
    const newColumOrder = [...columnOrder];
    const indexColumn = newColumOrder.indexOf(columnKey);
    newColumOrder.splice(indexColumn, 1);
    newColumOrder.splice(indexColumn - 1, 0, columnKey);
    return newColumOrder;
  };

  const handleMoveToRight = (columnKey: string) => {
    const columOrderToRigth = moveColumnToRight(columnKey, columnaOrder);
    setColumnaOrder(columOrderToRigth);
  };

  const handleMoveToLeft = (columnKey: string) => {
    const columOrderToRigth = moveColumnToLeft(columnKey, columnaOrder);
    setColumnaOrder(columOrderToRigth);
  };

  // Reiniciar los datos de la tabla

  const reinitiateTable = () => setData(promotionsPrestaydata);
  /** Instanciamos una tabla usan el hook useReactTable, nos traemos los metodos que nos interesan. */

  // En este caso nos interesa modificar el orden de las columnas.

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder: columnaOrder,
    },
    onColumnOrderChange: setColumnaOrder,
  });

  // reiniciar el orden de las tablas.

  const resetTableOrder = () => {
    const orderColumnInitial = tableInstance.getAllLeafColumns().map((column) => column.id);
    setColumnaOrder(orderColumnInitial);
  };

  useEffect(() => {
    resetTableOrder();
  }, []);

  console.log(tableInstance.getState().columnOrder);
  // console.log(tableInstance.getAllLeafColumns());

  return (
    <div id="order-table">
      <h2>Order Table</h2>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            // console.log('Desde Order HeaderGroup', headerGroup);
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                // console.log('Desde el order Header', header);
                <th key={header.id} colSpan={header.colSpan}>
                  <CellHeader
                    key={header.id}
                    label={
                      header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())
                    }
                    as="div"
                  />
                  <div className="flex">
                    <ActionButton icon={{ name: 'arrow_back' }} onClick={() => handleMoveToLeft(header.id)} />

                    <ActionButton
                      icon={{ name: 'arrow_forward' }}
                      onClick={() => handleMoveToRight(header.id)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getCoreRowModel().rows.map((row) => (
            // console.log('row', row);
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                // console.log('cell', cell);
                <Cell size="M" zebra={false}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(tableInstance.getState().columnOrder, null, 2)}</pre>
    </div>
  );
}
