import React from 'react';

const Form = () => {
    return (
      <div>
        <h2>Preencha os dados abaixo</h2>
        <form>
          <label>Email: </label>
          <input className='campoEmail' type='email'></input>
          
          <label>Senha: </label>
          <input className='campoEmail' type='email'></input>
        </form>
      </div>
    );
}

export default Form;
