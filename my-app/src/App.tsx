import React, { useEffect, useState } from 'react';
import './App.scss';
import { MultiSelect } from '@mantine/core';

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
  const [filterOptions, setFilterOptions] = useState<string[]>(['All']);

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

  const filterItems = ['All', 'ID', 'Name', 'Gender', 'Age', 'Diagnosis Date', 'Status']
  
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
        <MultiSelect
          label="Filter the data!"
          placeholder="Filter by..."
          data={filterItems}
          onChange={setFilterOptions}
          style={{ width: '35%' }}
          defaultValue={['All']}
          clearable
          searchable
          nothingFoundMessage="Nothing found..."
        />
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                {(filterOptions.includes('All') || filterOptions.includes('ID')) && (
                  <th onClick={() => handleHeaderClick('id')}>
                    ID {sortField.fieldToSort === 'id' && (sortField.direction === 'asc' ? '↑' : '↓')}
                  </th> )}
                {(filterOptions.includes('All') || filterOptions.includes('Name')) && (
                  <th onClick={() => handleHeaderClick('name')}>
                    Name {sortField.fieldToSort === 'name' && (sortField.direction === 'asc' ? '↑' : '↓')}
                  </th> )}
                {(filterOptions.includes('All') || filterOptions.includes('Gender')) && (
                  <th onClick={() => handleHeaderClick('gender')}>
                    Gender {sortField.fieldToSort === 'gender' && (sortField.direction === 'asc' ? '↑' : '↓')}
                  </th> )}
                {(filterOptions.includes('All') || filterOptions.includes('Age')) && (
                  <th onClick={() => handleHeaderClick('age')}>
                    Age {sortField.fieldToSort === 'age' && (sortField.direction === 'asc' ? '↑' : '↓')}
                  </th> )}
                {(filterOptions.includes('All') || filterOptions.includes('Diagnosis Date')) && (
                  <th onClick={() => handleHeaderClick('diagnosisDate')}>
                    Diagnosis Date {sortField.fieldToSort === 'diagnosisDate' && (sortField.direction === 'asc' ? '↑' : '↓')}
                  </th> )}
                {(filterOptions.includes('All') || filterOptions.includes('Status')) && (
                  <th onClick={() => handleHeaderClick('status')}>
                    Status {sortField.fieldToSort === 'status' && (sortField.direction === 'asc' ? '↑' : '↓')}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              {
                sortedData().map((item: DataItem, index: number) => {
                  return (
                  <tr key={index}>
                    {(filterOptions.includes('All') || filterOptions.includes('ID')) && ( <td>{item.id}</td> )}
                    {(filterOptions.includes('All') || filterOptions.includes('Name')) && ( <td>{item.name}</td> )}
                    {(filterOptions.includes('All') || filterOptions.includes('Gender')) && ( <td>{item.gender}</td> )}
                    {(filterOptions.includes('All') || filterOptions.includes('Age')) && ( <td>{item.age}</td> )}
                    {(filterOptions.includes('All') || filterOptions.includes('Diagnosis Date')) && ( <td>{item.diagnosisDate}</td> )}
                    {(filterOptions.includes('All') || filterOptions.includes('Status')) && (<td>{item.status}</td> )}
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
