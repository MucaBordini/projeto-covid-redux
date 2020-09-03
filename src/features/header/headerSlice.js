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
      console.log(response.data);
      dispatch(headerActions.set_login(response.data));
    });
  
    
  }

export default headerSlice.reducer;