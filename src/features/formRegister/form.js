import React from 'react';

const Form = () => {
    return (
      <div>
        <h2>Preencha os dados abaixo</h2>
        <div>
        <form>
          <label>Email: </label>
          <input className='campoEmail' type='email'></input>
          
          <label>Senha: </label>
          <input className='campoEmail' type='email'></input>
        </form>
        
            <button className="botao">Cadastrar</button>
        </div>
      </div>
    );
}

export default Form;
