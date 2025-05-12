# react-glowing-tables

`react-glowing-tables` is a flexible and stylish React table component that supports editing, pagination, sorting, and glowing hover effects — all out of the box.

✨ Perfect for dashboards, admin panels, and modern UIs needing interactive, customizable data tables with a touch of visual flair.

## Cool Table 
![Demo](/src/assets/table-1.GIF)

## Cool Table Pro
![Demo](/src/assets/table-2.GIF)

## Features
- ✅ Fully editable cells
- ✨ Glowing hover effect for modern visuals
- 🔢 Supports multiple data types (text, number, select, checkbox, date, button)
- 🔁 Pagination and sorting
- 🎨 Customizable styling (background, cell colors)
- 🔧 Custom cell components   

## Installation

```bash
npm install react-glowing-tables
# or
yarn add react-glowing-tables
```

## Components

```
// Props

type ColumnType = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'button'

interface Column {
  key: string
  title: string | React.ReactNode
  type?: ColumnType
  editable?: boolean
  options?: string[]        // For 'select' type
  component?: React.ReactNode // Custom JSX to render
  onClick?: (row: Record<string, any>) => void // For 'button' type
}

interface CoolTableProps<T> {
  columns: Column[]
  data: T[]
  onCellChange?: (rowIndex: number, key: keyof T, value: any) => void
  onChange?: (newData: T[]) => void
  className?: string
  backgroundColor?: string
  blocksColor?: string
}

```

## CoolTablePro
- An extended version of CoolTable with pagination and sorting support.

```
// Extra Props

interface CoolTableProProps<T> extends CoolTableProps<T> {
  pageSizeOptions?: number[]   // Default: [5, 10, 20]
  defaultPageSize?: number     // Default: 10
}
```

## Usage

```
import { CoolTablePro } from 'react-glowing-tables'

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name', editable: true, type: 'text' },
  { key: 'age', title: 'Age', editable: true, type: 'number' },
  { key: 'gender', title: 'Gender', editable: true, type: 'select', options: ['Male', 'Female'] },
  { key: 'active', title: 'Active', editable: true, type: 'checkbox' },
]

const data = [
  { id: 1, name: 'Alice', age: 28, gender: 'Female', active: true },
  { id: 2, name: 'Bob', age: 32, gender: 'Male', active: false },
]

export default function App() {
  return (
    <CoolTablePro
      columns={columns}
      data={data}
      onChange={(updated) => console.log(updated)}
    />
  )
}

```
