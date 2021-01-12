import React from 'react'

interface Row {
  letter: string
  value: Number
}

interface TableCountProps {
  rows: Row[]
}

export default function TableCount({ rows = [] }: TableCountProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Character
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Count
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows &&
          rows.length &&
          rows.map((row: Row) => {
            return (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.letter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.value}
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
