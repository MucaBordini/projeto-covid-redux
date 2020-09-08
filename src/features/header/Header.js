import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user_map, login, register } from './headerSlice';

import logo from '../../assets/coronavirus.png'
import './Header.css';

function Header() {
    const user = useSelector(user_map);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logado] = useState(localStorage.getItem('logged'))
    const dispatch = useDispatch();

    const [toggleForm, setToggleForm] = useState(false);


    function handleToggleForm() {
        toggleForm ? setToggleForm(false) : setToggleForm(true);
    }

    useEffect(() => {
        if (!localStorage.getItem('token')){
            localStorage.setItem('token', 'undefined')
        }
        if (localStorage.getItem('token') === 'undefined'){
            localStorage.setItem('token', `${user.token}`)
        } 
    }, [logado, user.token]);

    return (
        <div className='container'>
            <div className='image'>
                <img src={logo} alt="covid logo"/>
            </div>
            {
                logado ? (
                    <button className="botao" onClick={() => {
                        localStorage.clear();
                        window.location.reload(false);
                    }}>Sair</button>
                )
                :
                (<div className='inputs'>
                    <label>Email: </label>
                    <input className='campoEmail' type='email' onChange={(ev) => setEmail(ev.target.value)}></input>
                        
                    <label>Senha: </label>
                    <input className='campoSenha' type='password' onChange={(ev) => setPassword(ev.target.value)}></input>
                        
                    <div>
                        <button className="botao" onClick={() => {
                            dispatch(login(email, password));
                        }}>LOGIN</button>
                        
                    </div>
                    <div> 
                        <button className="botao" onClick={() => handleToggleForm()}>REGISTRAR-SE</button>
                    </div>
                </div>)
            }
            
            {toggleForm ? (
                <div>
                    <h2>Preencha os dados abaixo</h2>
                    <label>Email: </label>
                    <input className='campoEmail' type='email' onChange={(ev) => setEmail(ev.target.value)}></input>
                            
                    <label>Senha: </label>
                    <input className='campoSenha' type='password' onChange={(ev) => setPassword(ev.target.value)}></input>

                    <button className="botao" onClick={() => dispatch(register(email, password))}>Cadastrar</button>
                </div>
            ) : null}
        </div>
    );
}

export default Header;
