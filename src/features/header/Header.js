import React from 'react';
import './Header.css';
import logo from '../../assets/coronavirus.png'

export default class Header extends React.Component {
    render() {
        return(
            <div className='container'>
                <div className='image'>
                    <img src={logo}/>
                </div>
                <div className='inputs'>
                    <label>
                        Email:
                        <input className='campoEmail' type='email'></input>
                    </label>
                    <label>
                        Senha:
                        <input className='campoSenha' type='password'></input>
                    </label>
                    <div>
                        <button>LOGIN</button>
                    </div>
                </div>
                
            </div>
        )
    }
}