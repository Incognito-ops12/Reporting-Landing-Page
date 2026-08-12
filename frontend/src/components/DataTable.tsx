import type { ReactNode } from 'react'

export interface TableColumn<Row> {
  key: string
  header: string
  align?: 'left' | 'right'
  render: (row: Row) => ReactNode
}

interface DataTableProps<Row> {
  caption: string
  columns: TableColumn<Row>[]
  rows: Row[]
  getRowKey: (row: Row) => string
}

export function DataTable<Row>({
  caption,
  columns,
  rows,
  getRowKey,
}: DataTableProps<Row>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-600 uppercase">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-5 py-3.5 ${column.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="transition-colors hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`whitespace-nowrap px-5 py-4 text-slate-700 ${column.align === 'right' ? 'text-right tabular-nums' : 'text-left'}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
