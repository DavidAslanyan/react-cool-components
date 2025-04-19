import { ReactNode } from 'react'
import EditableCell from '../editable-cell'
import GlitterMouseEffect from '../glitter-mouse-effect'

export type ColumnType = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'button'

export interface Column {
  key: string
  title: string | React.ReactNode
  type?: ColumnType
  component?: ReactNode
  editable?: boolean
  options?: string[]
  onClick?: (row: Record<string, any>) => void
}

export interface CoolTableProps<T extends Record<string, any>> {
  columns: Column[]
  data: T[]
  onCellChange?: (rowIndex: number, key: keyof T, value: any) => void
  className?: string,
  onChange?: (newData: T[]) => void,
  backgroundColor?: string,
  blocksColor?: string
}

const CoolTable = <T extends Record<string, any>>({
  columns,
  data,
  onCellChange,
  className,
  backgroundColor,
  blocksColor
}: CoolTableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className} bg-thirdly border-gray-400`}>
      <GlitterMouseEffect color='red' />
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-secondary text-white rounded-md relative z-30">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left font-medium px-4 py-2">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => {
                const value = row[col.key]
                return (
                  <td key={col.key} className="px-4 py-2 border-b border-gray-400 rounded-md">
                    <EditableCell
                      col={col}
                      value={value}
                      row={row}
                      rowIndex={rowIndex}
                      onChange={onCellChange}
                      backgroundColor={backgroundColor}
                      blocksColor={blocksColor}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoolTable
