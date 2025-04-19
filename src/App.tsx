import { useState } from 'react'
import CoolTable, { Column } from './components/cool-table/CoolTable'
import CoolTablePro from './components/cool-table-pro/CoolTablePro';

const columns: Column[] = [
  { key: 'name', title: 'Name', editable: true, type: 'text' },
  { key: 'age', title: 'Age', editable: true, type: 'number' },
  { key: 'subscribe', title: 'Subscribed', editable: true, type: 'checkbox' },
  { key: 'major', title: 'Major', editable: true, type: 'select', options: ['CS', 'Math', 'Physics', 'Engineering', 'Philosophy', 'History'] },
  { key: 'action', title: 'Action', editable: true, type: 'button' },
];


const initialData = [
  { name: 'Alice', age: 22, subscribe: true, major: 'Physics', action: 'View' },
  { name: 'Bob', age: 27, subscribe: false, major: 'Engineering', action: 'View' },
  { name: 'Charlie', age: 35, subscribe: true, major: 'Biology', action: 'Delete' },
  { name: 'Dana', age: 29, subscribe: false, major: 'Chemistry', action: 'View' },
  { name: 'Eva', age: 23, subscribe: true, major: 'Mathematics', action: 'Delete' },
  { name: 'Frank', age: 31, subscribe: false, major: 'Computer Science', action: 'Edit' },
  { name: 'Grace', age: 40, subscribe: true, major: 'Philosophy', action: 'Edit' },
  { name: 'Hank', age: 28, subscribe: false, major: 'Law', action: 'View' },
  { name: 'Ivy', age: 26, subscribe: true, major: 'Economics', action: 'Delete' },
  { name: 'Jack', age: 33, subscribe: false, major: 'Literature', action: 'Edit' },
  { name: 'Karen', age: 24, subscribe: true, major: 'History', action: 'View' },
  { name: 'Leo', age: 27, subscribe: false, major: 'Sociology', action: 'View' },
  { name: 'Mia', age: 32, subscribe: true, major: 'Psychology', action: 'Delete' },
  { name: 'Nate', age: 36, subscribe: false, major: 'Art', action: 'Edit' },
  { name: 'Olivia', age: 29, subscribe: true, major: 'Music', action: 'Delete' },
  { name: 'Paul', age: 30, subscribe: false, major: 'Linguistics', action: 'Edit' },
  { name: 'Quinn', age: 25, subscribe: true, major: 'Theology', action: 'View' },
  { name: 'Rachel', age: 28, subscribe: false, major: 'Political Science', action: 'View' },
  { name: 'Steve', age: 31, subscribe: true, major: 'Business', action: 'Delete' },
  { name: 'Tina', age: 34, subscribe: false, major: 'Geography', action: 'Edit' },
  { name: 'Uma', age: 22, subscribe: true, major: 'Arts', action: 'Delete' },
  { name: 'Vera', age: 27, subscribe: false, major: 'Design', action: 'View' },
  { name: 'Will', age: 32, subscribe: true, major: 'Environmental Science', action: 'Edit' },
  { name: 'Xander', age: 33, subscribe: false, major: 'Medicine', action: 'View' },
  { name: 'Yara', age: 24, subscribe: true, major: 'Public Health', action: 'Delete' },
  { name: 'Zane', age: 29, subscribe: false, major: 'Mathematics', action: 'Edit' },
  { name: 'Aaron', age: 40, subscribe: true, major: 'Architecture', action: 'View' },
  { name: 'Beth', age: 38, subscribe: false, major: 'Journalism', action: 'Edit' },
  { name: 'Cameron', age: 27, subscribe: true, major: 'Political Science', action: 'Delete' },
  { name: 'Diana', age: 23, subscribe: false, major: 'Music', action: 'Edit' },
  { name: 'Ethan', age: 34, subscribe: true, major: 'Engineering', action: 'View' },
  { name: 'Fiona', age: 30, subscribe: false, major: 'Law', action: 'Delete' },
  { name: 'Gina', age: 26, subscribe: true, major: 'Medicine', action: 'Edit' },
  { name: 'Harry', age: 28, subscribe: false, major: 'Economics', action: 'Delete' },
  { name: 'Iris', age: 32, subscribe: true, major: 'Chemistry', action: 'View' },
  { name: 'Jackie', age: 29, subscribe: false, major: 'Biology', action: 'Edit' },
  { name: 'Kyle', age: 25, subscribe: true, major: 'History', action: 'Delete' },
  { name: 'Lily', age: 33, subscribe: false, major: 'Philosophy', action: 'Edit' },
  { name: 'Mason', age: 26, subscribe: true, major: 'Arts', action: 'View' },
  { name: 'Nina', age: 31, subscribe: false, major: 'Design', action: 'Delete' },
  { name: 'Oscar', age: 24, subscribe: true, major: 'Sociology', action: 'Edit' },
  { name: 'Paige', age: 37, subscribe: false, major: 'Psychology', action: 'View' },
  { name: 'Quincy', age: 27, subscribe: true, major: 'Business', action: 'Delete' },
  { name: 'Riley', age: 30, subscribe: false, major: 'Arts', action: 'Edit' },
  { name: 'Sophia', age: 28, subscribe: true, major: 'Engineering', action: 'View' },
  { name: 'Tyler', age: 33, subscribe: false, major: 'Political Science', action: 'Delete' },
  { name: 'Ursula', age: 22, subscribe: true, major: 'Public Health', action: 'Edit' },
  { name: 'Victor', age: 29, subscribe: false, major: 'Mathematics', action: 'View' },
  { name: 'Wendy', age: 26, subscribe: true, major: 'Geography', action: 'Delete' },
  { name: 'Xena', age: 34, subscribe: false, major: 'Music', action: 'Edit' },
  { name: 'Yves', age: 38, subscribe: true, major: 'Architecture', action: 'View' },
  { name: 'Zoe', age: 31, subscribe: false, major: 'Linguistics', action: 'Delete' },
];


function App() {
  const [data, setData] = useState(initialData)

  return (
    <>
     <div>
      <CoolTable columns={columns} data={data} onChange={setData} />
      <div >
      <CoolTablePro
        columns={columns}
        data={data}
        onChange={(updatedData) => {
          setData(updatedData)
        }}
        defaultPageSize={5}
        pageSizeOptions={[3, 5, 10]}
      />
      </div>
     </div>
    </>
  )
}

export default App
