import React, { useEffect, useState } from 'react';
import './App.scss';
import { Data } from 'ws';

interface DataItem {
  id: string;
  name: string;
  gender: string;
  age: string;
  diagnosisDate: string;
  status: string;
}

function App() {
  const [ data, setData ] = useState<any>([]);
  const [ sortField, setSortField ] = useState({ fieldToSort: 'id', direction: 'asc' })

  const handleHeaderClick = (field: string) => {
    setSortField({
      fieldToSort: field,
      direction: 
      field === sortField.fieldToSort ? sortField.direction === 'asc' ? 'desc' : 'asc' : 'desc'
    })
  }

  const sortedData = () => {
    if (sortField.direction === 'asc') {
      return data.sort((a: any, b: any) => (a[sortField.fieldToSort] > b[sortField.fieldToSort]) ? 1 : -1)
    } else {
      return data.sort((a: any, b: any) => (a[sortField.fieldToSort] < b[sortField.fieldToSort]) ? 1 : -1)
    }
  }
  
  useEffect(() => {
    fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects')
      .then((res) => res.json())
      .then( data => {
        setData(data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <body className='body'>
      <main className="table">
        <section className='table__header'>
          Search
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleHeaderClick('id')}>
                  ID {sortField.fieldToSort === 'id' && (sortField.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleHeaderClick('name')}>
                  Name {sortField.fieldToSort === 'name' && (sortField.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleHeaderClick('gender')}>
                  Gender {sortField.fieldToSort === 'gender' && (sortField.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleHeaderClick('age')}>
                  Age {sortField.fieldToSort === 'age' && (sortField.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleHeaderClick('diagnosisDate')}>
                  Diagnosis Date {sortField.fieldToSort === 'diagnosisDate' && (sortField.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleHeaderClick('status')}>
                  Status {sortField.fieldToSort === 'status' && (sortField.direction === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                sortedData().map((item: DataItem, index: number) => {
                  return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.age}</td>
                    <td>{item.diagnosisDate}</td>
                    <td>{item.status}</td>
                  </tr>
                  )})
              }
            </tbody>
          </table>
        </section>
      </main>
    </body>
   
  );
}

export default App;
