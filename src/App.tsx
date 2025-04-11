import { useState } from 'react'
import CoolTable, { Column } from './components/cool-table/CoolTable'

const columns: Column[] = [
  { key: 'name', title: 'Name', editable: true, type: 'text' },
  { key: 'age', title: 'Age', editable: true, type: 'number' },
  { key: 'subscribe', title: 'Subscribed', editable: true, type: 'checkbox' },
  { key: 'major', title: 'Major', editable: true, type: 'select', options: ['CS', 'Math', 'Physics'] },
  { key: 'action', title: 'Action', editable: true, type: 'button', component: <button className='bg-green-500'>Click</button>, onClick: (row) => alert(`Row clicked: ${row.name}`) },
];

const initialData = [
  { name: 'John', age: 25, subscribe: true, major: 'CS', action: 'Edit' },
  { name: 'Jane', age: 30, subscribe: false, major: 'Math', action: 'Edit' },
];

function App() {
  const [data, setData] = useState(initialData)

  return (
    <>
     <div>
      <h1 className='text-'>Hey man</h1>
      <CoolTable columns={columns} data={data} onChange={setData} />
     </div>
    </>
  )
}

export default App
