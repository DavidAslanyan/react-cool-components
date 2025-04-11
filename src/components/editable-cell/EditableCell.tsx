import React from 'react' 
import { Column } from '../cool-table/CoolTable'

interface EditableCellProps {
  col: Column
  value: any
  row: Record<string, any>
  rowIndex: number
  onChange: (rowIndex: number, key: string, value: any) => void
}

const EditableCell: React.FC<EditableCellProps> = ({ col, value, row, rowIndex, onChange }) => {
  if (col.component) {
    return <>{col.component}</>
  }
  
  if (!col.editable) {
    return <span>{value?.toString()}</span>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(rowIndex, col.key, e.target.value)
  }

  switch (col.type) {
    case 'select':
      if (col.options) {
        return (
          <select value={value ?? ''} onChange={handleInputChange} className="w-full px-2 py-1 border">
            {col.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )
      }
      return <span>{value}</span>

    case 'checkbox':
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(rowIndex, col.key, e.target.checked)}
        />
      )

    case 'button':
      return (
        <button onClick={() => col.onClick?.(row)} className="px-3 py-1 bg-blue-500 text-white rounded">
          {value}
        </button>
      )

    case 'date':
      return (
        <input
          type="date"
          value={value ?? ''}
          onChange={handleInputChange}
        />
      )
    case 'number':
      return (
        <input
          type="number"
          value={value ?? ''}
          onChange={handleInputChange}
        />
      )
    case 'text':
      return (
        <input
          type={col.type || 'text'}
          value={value ?? ''}
          onChange={handleInputChange}
          className="w-full px-2 py-1 border"
        />
      )
    default:
      return (
        <input
          type={col.type || 'text'}
          value={value ?? ''}
          onChange={handleInputChange}
          className="w-full px-2 py-1 border"
        />
      )
  }
}

export default EditableCell
