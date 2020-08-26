import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const covidSlice = createSlice({
  name: 'covid',
  initialState: { casos: [], estados: [] },
  reducers: {
    set_casos: (state, action) => {
      state.casos = action.payload;
      return state;
    },
    set_estados: (state, action) => {
      state.estados = action.payload;
      return state;
    }
  }
});

export const casos_map = (state) => state.covid.casos;
export const estados_map = (state) => state.covid.estados;
export const covidActions = covidSlice.actions;
export const find_estados = () => async (dispatch) => {
  const res = await axios.get(
    'https://covid19-brazil-api.now.sh/api/report/v1'
  );

  dispatch(covidActions.set_estados(res.data.data));
}
export const find_casos = () => async (dispatch) => {
  const res = await axios.get(
    'https://covid19-brazil-api.now.sh/api/report/v1'
  );

  dispatch(covidActions.set_casos(res.data.data));
}
export const search_casos = (uf) => async (dispatch) => {
  console.log(uf);
  if (uf !== "todos"){
    const res = await axios.get(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`
    );
    
    dispatch(covidActions.set_casos([res.data]));
  } else {
    const res = await axios.get(
      'https://covid19-brazil-api.now.sh/api/report/v1'
    );
    dispatch(covidActions.set_estados(res.data.data));
  }
}
export default covidSlice.reducer;