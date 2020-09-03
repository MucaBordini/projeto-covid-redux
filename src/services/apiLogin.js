import axios from 'axios';

const apiLogin = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export default apiLogin;