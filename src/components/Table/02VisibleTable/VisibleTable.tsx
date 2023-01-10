/* eslint-disable object-curly-newline */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { Cell, CellHeader, CheckBox } from '@flat101/componentes';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useState } from 'react';
import { promotionsPrestaydata } from '../../../data/prestayPromotion.data';
import { grupoColumns } from './grupoTbl.tablemodel';

export function VisibleTable() {
  // Nos traemos los datos y los guardamos en un estado
  const [data, setData] = useState(promotionsPrestaydata);

  /* AHora las columnas no se encuentran fijas, usamos otro estado. Las necesitamos para
    almacenar el orden de columnas pues tanstack lo realiza siguiendo un array de las columnas
  */
  const [columns] = useState(() => [...grupoColumns]);

  /** Ocultar Columnas, podemos indicar mediante un flag
   * que una columna se muestre o no de igual manera
   * usamos un estado
   */
  const [columnVisible, setColumnVisible] = useState({});

  // Reiniciar la tabla

  const reinitiateTable = () => setData(promotionsPrestaydata);

  /* Instanciamos una tabla usan el hook useReactTable, nos traemos los metodos que nos interesan. */

  // A este hook le pasamos el estado de las propiedades de la tabla que necesitamos para darle funcionalidad
  // Este state de la tabla ya tiene definidas propiedades que se las iremos pasando a traves de los diferentes estados

  // Este ejemplo es con las propiedades (metodos), onColumn... que son handle's preparados para esta funcionalidad

  // Los Metodos que queramos usar para

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: columnVisible,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisible,
  });

  /**  debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    debugRows: true,
     */

  /** NOTAS SOBRE FUNCIONES
   *  getAllLeafColumns(). Devuelve todas las columnas aplanadas (los headerGroups no son columnas)
   *  getAllFlatColumns(). Hace lo mismo pero incluyendo los headersGroups
   */
  // console.log(tableInstance.getAllLeafColumns());

  {
    /*
      MIRAR CON RICARD CheckBox no es compatible con TANSTACK, nuestro Onclick es controlado mientras
      que el de un input checkbox normal no lo es. Y ese es el que contempla TanStack

    <CheckBox
            key={column.id}
            isIndeterminate={false}
            label={column.columnDef.header?.toString()}
            isChecked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}

          /> */
  }
  /*
          <label htmlFor={column.id}>
            <input
              {...{
                name: column.id,
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />
            {column.id}
          </label>
    */

  const toogleVisibility = () => {};

  return (
    <div id="grupoTable">
      <h2 className="inter-headline-01-bold">Visible Table</h2>
      <div id="table/control">
        <p>controles</p>
        {tableInstance.getAllLeafColumns().map((column) => (
          <label htmlFor={column.id} className="px-2">
            <input
              className="mx-1"
              name={column.id}
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </label>
        ))}
      </div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            console.log('headerGroup: ', headerGroup);
            return (
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
            );
          })}
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
