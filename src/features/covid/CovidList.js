import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { casos_map, find_casos, search_casos, estados_map, find_estados } from './covidSlice';

import './CovidList.css'

function CovidList() {
  const casos = useSelector(casos_map);
  const estados = useSelector(estados_map);
  const [uf, setUf] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(find_casos());
    dispatch(find_estados());
  }, [dispatch]);
  
  return (
    <div className='lista'>

      <select className="selectstate" defaultValue={'DEFAULT'} onChange={(ev) => setUf(ev.target.value)}>
        <option hidden value='DEFAULT'>Selecione um estado</option>
        <option value='todos'>Todos os estados</option>
        {
          estados.map((estado, index) => {
            return (
              <option value={estado.uf} key={index}>{estado.state}</option>
            );
        })}
      </select>
      <button className='pesquisa' onClick={() => dispatch(search_casos(uf))}>Search</button>

        <table className="tabela">
        <caption className="legendatabela">Covid no Brasil</caption>
            <thead className="cabecalho">
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
              console.log(caso, index)
              return (
                <tr key={index}>
                <td className='itens'>{caso.estado}</td>
                <td className='itens'>{caso.casos}</td>
                <td className='itens'>{caso.mortes}</td>
                <td className='itens'>{caso.suspeitos}</td>
                <td className='itens'>{caso.ultimaAtualizacao}</td>
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
