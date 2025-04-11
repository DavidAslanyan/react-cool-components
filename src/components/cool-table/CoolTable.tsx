import { useState, useEffect, ReactNode } from 'react'
import EditableCell from '../editable-cell'

export type ColumnType = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'button'

export interface Column {
  key: string
  title: string
  type?: ColumnType
  component?: ReactNode
  editable?: boolean
  options?: string[]
  onClick?: (row: Record<string, any>) => void
}

export interface CoolTableProps<T extends Record<string, any>> {
  columns: Column[]
  data: T[]
  onChange?: (newData: T[]) => void
  className?: string
}

const CoolTable = <T extends Record<string, any>>({
  columns,
  data,
  onChange,
  className
}: CoolTableProps<T>) => {
  const [localData, setLocalData] = useState<T[]>(data)

  useEffect(() => {
    setLocalData(data)
  }, [data])

  const handleChange = (rowIndex: number, key: keyof T, value: any) => {
    const updated = [...localData]
    updated[rowIndex] = {
      ...updated[rowIndex],
      [key]: value
    }
    setLocalData(updated)
    onChange?.(updated)
  }
  
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-2 border-b border-gray-300">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => {
                const value = row[col.key]
                return (
                  <td key={col.key} className="px-4 py-2 border-b border-gray-200">
                    <EditableCell
                      col={col}
                      value={value}
                      row={row}
                      rowIndex={rowIndex}
                      onChange={handleChange}
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
