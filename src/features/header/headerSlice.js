import { createSlice } from '@reduxjs/toolkit';
import apiLogin from '../../services/apiLogin';

export const headerSlice = createSlice({
    name: 'user',
    initialState: { token: ''},
    reducers: {
      set_login: (state, action) => {
        state.token = action.payload;
        return state;
      },
      set_register: (state, action) => {
        state.token = action.payload;
        return state;
      }
    }
});

export const user_map = (state) => state.user.token;
export const headerActions = headerSlice.actions;

export const login = (emailUser, passwordUser) => async (dispatch) => {
    await apiLogin.post('login', {
      email: emailUser,
      password: passwordUser
    }).then(function (response) {
      localStorage.setItem('logged', true);
      console.log(response.data);
      dispatch(headerActions.set_login(response.data));
      setTimeout(function() {
        window.location.reload(false);
    }, 400);
    }).catch( error => {
      alert('Erro ao efetuar login\n', error);
    });
}

export const register = (emailUser, passwordUser) => async (dispatch) => {
  await apiLogin.post('users', {
    email: emailUser,
    password: passwordUser
  }).then((response) => {
    console.log(response.data);
    alert('Usuário criado com sucesso!');
    dispatch(headerActions.set_register(response.data));
  }).catch( error => {
    alert('Erro ao criar novo usuário\n', error);
  });
}

export default headerSlice.reducer;