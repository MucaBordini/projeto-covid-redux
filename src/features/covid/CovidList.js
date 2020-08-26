import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CovidList() {
  const [casos, setCasos] = useState([]);
  const [uf, setUf] = useState('');

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        'https://covid19-brazil-api.now.sh/api/report/v1'
      );

      setCasos(res.data.data);
    })();
  }, []);

  async function search() {
    const res = await axios.get(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`
    );

    setCasos([res.data])
  }

  return (
    <div className="covid_list">

      <select defaultValue={'DEFAULT'} onChange={(ev) => setUf(ev.target.value)}>
        <option hidden value='DEFAULT'>Selecione um estado</option>
        <option value='sp'>São Paulo</option>
        <option value='pr'>Paraná</option>
      </select>
      <button onClick={() => search()}>Search</button>

      <ul>
        {casos.map((caso, index) => {
          return <li key={index}>Estado: {caso.uf} Casos: {caso.cases}</li>;
        })}
      </ul>
    </div>
  );
}

export default CovidList;
