import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CovidList() {

  const [casos , setCasos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        'https://covid19-brazil-api.now.sh/api/report/v1'
      );
      setCasos(res.data.data);
    })();
  }, []);

  return (
    <div className="App">
      <ul>
        {casos.map((caso, index) => {
          return <li key={index}>Estado: {caso.uf} Casos: {caso.cases}</li>;
        })}
      </ul>
    </div>
  );
}

export default CovidList;
