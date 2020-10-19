import { createSlice } from '@reduxjs/toolkit';
import db from '../../services/db';

export const headerSlice = createSlice({
    name: 'user',
    initialState: { token: '', error: ''},
    reducers: {
      set_login: (state, action) => {
        state.token = action.payload;
        return state;
      },
      set_register: (state, action) => {
        state.token = action.payload;
        return state;
      },
      set_error: (state, action) => {
        state.error = action.payload;
        return state;
      }
    }
});

export const user_map = (state) => state.user.token;
export const error_map = (state) => state.user.error;
export const headerActions = headerSlice.actions;

export const login = (emailUser, passwordUser) => async (dispatch) => {
  
  await db.post('sessions', {
    email: emailUser,
    password: passwordUser
  }).then(response => {
    if (response.data.isAdmin) {
      localStorage.setItem('admin', response.data.isAdmin);
    }
    localStorage.setItem('token', 'Bearer '+response.data.token);
    dispatch(headerActions.set_login(response.data));
    setTimeout(function() {
      window.location.reload(false);
    }, 400);
  }).catch( error => {
    dispatch(headerActions.set_error(error.response.data.error));
  });

  await db.get('authenticated', {
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  }).then(() => {
    localStorage.setItem('logged', true);
  });
}

export const register = (nomeUser, emailUser, passwordUser) => async (dispatch) => {
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  if (emailUser && passwordUser) {
    if(!mailFormat.test(emailUser)){
      dispatch(headerActions.set_error('Email inválido'));
    } else {
      await db.post('users', {
        nome: nomeUser,
        email: emailUser,
        password: passwordUser
      }).then((response) => {
        dispatch(headerActions.set_error('Usuário criado com sucesso!'));
        dispatch(headerActions.set_register(response.data));
      }).catch( error => {
        dispatch(headerActions.set_error(error.response.data));
      });
    }
  } else {
    dispatch(headerActions.set_error('Os campos não foram preenchidos corretamente'));
  }
}

export default headerSlice.reducer;