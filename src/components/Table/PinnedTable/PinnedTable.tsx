/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */

import { faker } from '@faker-js/faker';

import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { makeData } from '../../../data/makedata';
import { Person } from '../../../interfaces/Person';

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

export function PinnedTable() {
  const [data, setData] = useState(() => makeData(5000));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnPinning, setColumnPinning] = useState({});

  const [isSplit, setIsSplit] = useState(false);
  const rerender = () => setData(() => makeData(5000));

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const randomizeColumns = () => {
    table.setColumnOrder(faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id)));
  };

  const headergrup = table
    .getLeftHeaderGroups()
    .map((headergroup) => headergroup.headers.map((header) => header.getContext()));
  console.log('PinnedTable headergrup: ', headergrup);

  return (
    <div className="pinned-table">
      <div className="pinned-table-fields">
        <div className="pinned-table-side-bar">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map((column) => (
          <div key={column.id} className="input-columns">
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <div className="table-buttons">
          <button onClick={() => rerender()} className="button-10">
            Regenerate
          </button>
          <button onClick={() => randomizeColumns()} className="button-10">
            Shuffle Columns
          </button>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isSplit}
              onChange={(e) => setIsSplit(e.target.checked)}
            />{' '}
            Split Mode
          </label>
        </div>
        <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
      </div>

      <div className={`table-container ${isSplit ? 'gap-4' : ''}`}>
        {isSplit ? (
          <table className="border-2-gray">
            <thead>
              {table.getLeftHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div className="header-title">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>

                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className="header-content">
                          {header.column.getIsPinned() !== 'left' ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin('left');
                              }}
                            >
                              {'<='}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== 'right' ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin('right');
                              }}
                            >
                              {'=>'}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 20)
                .map((row) => (
                  <tr key={row.id}>
                    {row.getLeftVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}
        <table className="border-2-gray">
          <thead>
            {(isSplit ? table.getCenterHeaderGroups() : table.getHeaderGroups()).map(
              (headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div className="header-title">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className="header-content">
                          {header.column.getIsPinned() !== 'left' ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin('left');
                              }}
                            >
                              {'<='}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== 'right' ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin('right');
                              }}
                            >
                              {'=>'}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ),
            )}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 20)
              .map((row) => (
                <tr key={row.id}>
                  {(isSplit ? row.getCenterVisibleCells() : row.getVisibleCells()).map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {isSplit ? (
          <table className="border-2-gray">
            <thead>
              {table.getRightHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div className="header-title">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className="header-content">
                          {header.column.getIsPinned() !== 'left' ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin('left');
                              }}
                            >
                              {'<='}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== 'right' ? (
                            <button
                              className="button-10"
                              onClick={() => {
                                header.column.pin('right');
                              }}
                            >
                              {'=>'}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 20)
                .map((row) => (
                  <tr key={row.id}>
                    {row.getRightVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
