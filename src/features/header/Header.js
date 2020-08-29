import React from 'react';

import logo from '../../assets/coronavirus.png'

import './Header.css';
import { useState } from 'react';
import Form from '../formRegister/form';

const Header = () => {
    const [toggleForm, setToggleForm] = useState(true);

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
                <input className='campoEmail' type='email'></input>
                    
                <label>Senha: </label>
                <input className='campoSenha' type='password'></input>
                    
                <div>
                    <button>LOGIN</button>
                </div>

                <div>
                    <button onClick={() => handleToggleForm()}>REGISTRAR-SE</button>
                </div>
            </div>
            
            {toggleForm ? <Form /> : null}
            
        </div>
    );
}

export default Header;
