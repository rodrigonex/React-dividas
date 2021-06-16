import React, { useState, useEffect } from 'react'
import Sumary from './Components/Sumary'

export default function App() {
  const [data, setData] = useState([]);

  useEffect( () => {

    async function response () {

      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setData(data)
    }

    response();

  },[])

  return (
    <div className="container">
     <Sumary data={data} />
    </div>
  )
}

