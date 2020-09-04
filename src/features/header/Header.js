import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user_map, login } from './headerSlice';

import logo from '../../assets/coronavirus.png'
import './Header.css';
import Form from '../formRegister/form';


function Header() {
    const user = useSelector(user_map);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
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
                <img src={logo} alt="test"/>
            </div>
            {logado ? (
            <button onClick={() => {
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
                        localStorage.setItem('logged', true);
                        setTimeout(function() {
                            window.location.reload(false);
                        }, 1000);
                    }}>LOGIN</button>
                    
                </div>
                <div> 
                    <button className="botao" onClick={() => handleToggleForm()}>REGISTRAR-SE</button>
                </div>
            </div>)
            }
            
                    
                

                
            
            
            {toggleForm ? <Form /> : null}
           </div> 
        
    );
}

export default Header;
