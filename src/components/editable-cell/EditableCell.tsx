import { Column } from '../cool-table/CoolTable'
import EyeOpenIcon from '../svg/EyeOpenIcon'
import EditIcon from '../svg/EditIcon'
import TrashIcon from '../svg/TrashIcon'
import { COLORS } from '../../utils/colors'
import CheckIcon from '../svg/CheckIcon'

interface EditableCellProps {
  col: Column
  value: any
  row: Record<string, any>
  rowIndex: number
  onChange?: (rowIndex: number, key: string, value: any) => void,
  backgroundColor?: string,
  blocksColor?: string
}

const EditableCell: React.FC<EditableCellProps> = ({ 
  col, 
  value, 
  row, 
  rowIndex, 
  onChange ,
}) => {
  if (col.component) {
    return <>{col.component}</>
  }

  if (!col.editable) {
    return <span>{value?.toString()}</span>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange?.(rowIndex, col.key, e.target.value)
  }

  switch (col.type) {
    case 'select':
      if (col.options) {
        return (
          <select value={value ?? ''} onChange={handleInputChange} className="relative z-50 w-full px-2 py-1 border border-gray-800 bg-secondary text-white rounded-sm focus:outline-none cursor-pointer">
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
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange?.(rowIndex, col.key, e.target.checked)}
            className="sr-only peer"
          />
          <div className={`z-30 w-5 h-5 border-2 bg-thirdly border-gray-400 rounded-sm peer-checked:bg-secondary peer-checked:border-secondary flex items-center justify-center relative top-1`}>
            {value &&
            <CheckIcon width={14} height={12} color={COLORS.white} />
            }
          </div>
        </label>
      )

    case 'button':
      return (
        <section className='flex items-center gap-3 relative z-30'>
          <button onClick={() => col.onClick?.(row)} className="cursor-pointer w-8 h-8 flex items-center justify-center bg-secondary hover:opacity-75 transition-all text-white rounded">
            <EyeOpenIcon width={21} height={21} color={COLORS.white} />
          </button>
          <button onClick={() => col.onClick?.(row)} className="cursor-pointer w-8 h-8 flex items-center justify-center bg-secondary hover:opacity-75 transition-all text-white rounded">
            <EditIcon width={19} height={21} color={COLORS.white}/>
          </button>
          <button onClick={() => col.onClick?.(row)} className="cursor-pointer w-8 h-8 flex items-center justify-center bg-secondary hover:opacity-75 transition-all text-white rounded">
            <TrashIcon width={22} height={22} color={COLORS.primaryRed} />
          </button>
        </section>
      )

    case 'date':
      return (
        <input
          type="date"
          value={value ?? ''}
          onChange={handleInputChange}
          className='relative z-30 bg-secondary text-white border-gray-800 border focus:outline-none'
        />
      )

    case 'number':
      return (
        <input
          type="number"
          value={value ?? ''}
          onChange={handleInputChange}
          className='relative z-30 bg-secondary text-white border-gray-800 border px-2 py-1 rounded-sm focus:outline-none'
        />
      )

    case 'text':
    default:
      return (
        <input
          type="text"
          value={value ?? ''}
          onChange={handleInputChange}
          className="relative z-30 w-full px-2 py-1 border bg-secondary border-gray-800 text-white rounded-sm focus:outline-none"
        />
      )
  }
}

export default EditableCell;
