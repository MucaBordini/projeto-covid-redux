import React, { useState, useEffect } from 'react';
import { casos_map, find_casos, search_casos } from './covidSlice';
import { useSelector, useDispatch } from 'react-redux';
import './CovidList.css'

function CovidList() {
  const casos = useSelector(casos_map);
  const [uf, setUf] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(find_casos());
  }, [dispatch]);

  return (
    <div className='lista'>

      <select className="selectstate" defaultValue={'DEFAULT'} onChange={(ev) => setUf(ev.target.value)}>
        <option hidden value='DEFAULT'>Selecione um estado</option>
        <option value='sp'>São Paulo</option>
        <option value='pr'>Paraná</option>
      </select>
      <button className='pesquisa' onClick={() => dispatch(search_casos(uf))}>Search</button>
        <table class="tabela">
        <caption class="legendatabela">Covid no Brasil</caption>
            <thead class="cabecalho">
            <tr>
                <th className='cabecalho' scope="col">Estado</th>
                <th className='cabecalho' scope="col">Casos</th>
                <th className='cabecalho' scope="col">Mortes</th>
                <th className='cabecalho' scope="col">Suspeitas</th>
                <th className='cabecalho' scope="col">Última atualização</th>
            </tr>
            </thead>
            <tbody>
            {casos.map((caso, index) => {
              return (
                <tr>
                <td className='itens' key={index}>{caso.uf}</td>
                <td className='itens' key={index}>{caso.cases}</td>
                <td className='itens' key={index}>{caso.deaths}</td>
                <td className='itens' key={index}>{caso.suspects}</td>
                <td className='itens' key={index}>{caso.datetime}</td>
                </tr>
              );
            })}
            </tbody>
        </table>

      {/* <ul>
        <li className='cabecalho'>Estado - Casos</li>
        
      </ul> */}
    </div>
  );
}

export default CovidList;
