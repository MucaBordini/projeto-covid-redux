import { createSlice } from '@reduxjs/toolkit';
import apiLogin from '../../services/apiLogin';
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
  const user = {
    email: "samuca@email.com",
    password: "viadinho"
  }

  await db.post('sessions', {
    email: "samuca@email.com",
    password: "viadinho"
  }).then(response => {
    localStorage.setItem('logged', true);
      dispatch(headerActions.set_login(response.data));
      setTimeout(function() {
        window.location.reload(false);
    }, 400);
  }).catch( error => {
    dispatch(headerActions.set_error(error.response.data.error));
  });

    // await apiLogin.post('login', {
    //   email: emailUser,
    //   password: passwordUser
    // }).then(function (response) {
    //   localStorage.setItem('logged', true);
    //   dispatch(headerActions.set_login(response.data));
    //   setTimeout(function() {
    //     window.location.reload(false);
    // }, 400);
    // }).catch( error => {
    //   dispatch(headerActions.set_error(error.response.data.error));
    // });
}

export const register = (emailUser, passwordUser) => async (dispatch) => {
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  if (emailUser && passwordUser) {
    if(!mailFormat.test(emailUser)){
      dispatch(headerActions.set_error('Email inválido'));
    } else {
      await apiLogin.post('users', {
        email: emailUser,
        password: passwordUser
      }).then((response) => {
        dispatch(headerActions.set_error('Usuário criado com sucesso!'));
        dispatch(headerActions.set_register(response.data));
      }).catch( error => {
        dispatch(headerActions.set_error(error.response.data.error));
      });
    }
  } else {
    dispatch(headerActions.set_error('Email ou usuário não informados'));
  }
}

export default headerSlice.reducer;