import React, { useState, useEffect } from 'react';
import { casos_map, find_casos, search_casos } from './covidSlice';
import { useSelector, useDispatch } from 'react-redux';

function CovidList() {
  const casos = useSelector(casos_map);
  const [uf, setUf] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(find_casos());
  }, [dispatch]);

  return (
    <div className="covid_list">

      <select defaultValue={'DEFAULT'} onChange={(ev) => setUf(ev.target.value)}>
        <option hidden value='DEFAULT'>Selecione um estado</option>
        <option value='sp'>São Paulo</option>
        <option value='pr'>Paraná</option>
      </select>
      <button onClick={() => dispatch(search_casos(uf))}>Search</button>

      <ul>
        {casos.map((caso, index) => {
          return <li key={index}>Estado: {caso.uf} Casos: {caso.cases}</li>;
        })}
      </ul>
    </div>
  );
}

export default CovidList;
