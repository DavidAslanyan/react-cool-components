import { useMemo, useState, useEffect } from 'react'
import CoolTable from '../cool-table'
import { Column, CoolTableProps } from '../cool-table/CoolTable'
import ArrowIcon from '../svg/ArrowIcon'
import { COLORS } from '../../utils/colors'

interface CoolTableProProps<T extends Record<string, any>> extends CoolTableProps<T> {
  pageSizeOptions?: number[]
  defaultPageSize?: number
  selectableRows?: boolean
  breakpoints?: { [key: string]: number }
  onChange?: (newData: T[]) => void
  backgroundColor?: string,
  blocksColor?: string
}

const CoolTablePro = <T extends Record<string, any>>({
  columns,
  data,
  onChange,
  className,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 10,
  backgroundColor,
  blocksColor
}: CoolTableProProps<T>) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null)
  const [localData, setLocalData] = useState<T[]>(data)

  useEffect(() => {
    setLocalData(data)
  }, [data])

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  const sortedData = useMemo(() => {
    if (!sortConfig) return localData
    return [...localData].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [localData, sortConfig])

  const totalPages = Math.ceil(localData.length / pageSize)

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, page, pageSize])

  const handleCellChange = (rowIndex: number, key: keyof T, value: any) => {
    const updated = [...localData]
    const globalIndex = (page - 1) * pageSize + rowIndex
    updated[globalIndex] = { ...updated[globalIndex], [key]: value }
    setLocalData(updated)
    onChange?.(updated)
  }

  const handleHeaderClick = (col: Column) => {
    if (!col.key || col.key === '__checkbox__') return
    setSortConfig((prev) => {
      if (prev?.key === col.key) {
        return {
          key: col.key as keyof T,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { key: col.key as keyof T, direction: 'asc' }
    })
  }

  return (
    <div >
      <div className="overflow-x-auto">
        <CoolTable
          columns={columns.map((col) => ({
            ...col,
            title: (
              <span
                className="cursor-pointer select-none flex items-center"
                onClick={() => handleHeaderClick(col)}
              >
                {col.title}
                {sortConfig?.key === col.key &&
                  <div className={` transition-all transform ${sortConfig.direction === 'asc' ? '' : 'rotate-180'}`}>
                    <ArrowIcon color={COLORS.white} /> 
                  </div>
                }
              </span>
            ),
          }))}
          data={pagedData}
          onCellChange={handleCellChange}
          className={className}
          backgroundColor={backgroundColor}
          blocksColor={blocksColor}
        />
      </div>

      <div className="flex items-center justify-between text-sm px-2 py-4 bg-thirdly border-gray-400">
        <div className='text-white'>
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2 text-white relative">
          <select
            className="border px-2 py-1 focus:outline-none"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>

          <button className='bg-secondary border-md py-1 px-3 rounded-md cursor-pointer' disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border rounded cursor-pointer ${
                  page === pageNumber ? 'bg-secondary text-white' : 'bg-gray-500 text-white'
                }`}
              >
                {pageNumber}
              </button>
            )
          })}

          <button
            className='bg-secondary border-md py-1 px-3 rounded-md cursor-pointer'
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoolTablePro
