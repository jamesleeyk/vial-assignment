import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [ data, setData ] = useState<any>([]);
  
  useEffect(() => {
    fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects')
      .then((res) => res.json())
      .then( data => {
        setData(data.data)
        console.log(data.data)
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
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Diagnosis Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item: any, index: number) => {
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
