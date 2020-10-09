import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { casos_map, find_casos, search_casos, estados_map, find_estados, register_caso } from './covidSlice';

import './CovidList.css'

function CovidList() {
  const casos = useSelector(casos_map);
  const estados = useSelector(estados_map);
  const [uf, setUf] = useState('');
  const [estado, setEstado] = useState('');
  const [mortes, setMortes] = useState(0);
  const [confirmados, setConfirmados] = useState(0);
  const [suspeitas, setSuspeitas] = useState(0);
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
              <option value={estado} key={index}>{estado}</option>
            );
        })}
      </select>
      <button className='pesquisa' onClick={() => dispatch(search_casos(uf))}>Search</button>

      <div>
        <label>Estado: </label>
        <input className='campo' type='text' value={estado} onChange={(ev) => setEstado(ev.target.value)}></input>
        <label>Casos: </label>
        <input className='campo' type='number' value={confirmados} onChange={(ev) => setConfirmados(ev.target.value)}></input>
        <label>Mortes: </label>
        <input className='campo' type='number' value={mortes} onChange={(ev) => setMortes(ev.target.value)}></input>
        <label>Suspeitas: </label>
        <input className='campo' type='number' value={suspeitas} onChange={(ev) => setSuspeitas(ev.target.value)}></input>
        
        <button className="botao" onClick={() => dispatch(register_caso(estado, confirmados, mortes, suspeitas))}>Cadastrar</button>
      </div>

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
    </div>
  );
}

export default CovidList;
