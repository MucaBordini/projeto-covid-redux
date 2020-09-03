import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user_map, login } from './headerSlice';

import logo from '../../assets/coronavirus.png'
import './Header.css';
import Form from '../formRegister/form';

function Header() {
    const user = useSelector(user_map);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const [toggleForm, setToggleForm] = useState(false);

    function handleToggleForm() {
        toggleForm ? setToggleForm(false) : setToggleForm(true);
    }

    return (
        <div className='container'>
            <div className='image'>
                <img src={logo}/>
            </div>
            <div className='inputs'>
                <label>Email: </label>
                <input className='campoEmail' type='email' onChange={(ev) => setEmail(ev.target.value)}></input>
                    
                <label>Senha: </label>
                <input className='campoSenha' type='password' onChange={(ev) => setPassword(ev.target.value)}></input>
                    
                <div>
                    <button className="botao" onClick={() => dispatch(login(email, password))}>LOGIN</button>
                    <button onClick={() => console.log(user.token)}>CONSOLE</button>
                </div>

                <div> 
                    <button className="botao" onClick={() => handleToggleForm()}>REGISTRAR-SE</button>
                </div>
            </div>
            <hr></hr>
            
            {toggleForm ? <Form /> : null}
            
        </div>
    );
}

export default Header;
