import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const covidSlice = createSlice({
  name: 'covid',
  initialState: { casos: [] },
  reducers: {
    set_casos: (state, action) => {
      state.casos = action.payload;
      return state;
    }
  }
});

export const casos_map = (state) => state.covid.casos;
export const covidActions = covidSlice.actions;
export const find_casos = () => async (dispatch) => {
  const res = await axios.get(
    'https://covid19-brazil-api.now.sh/api/report/v1'
  );

  dispatch(covidActions.set_casos(res.data.data));
}
export const search_casos = (uf) => async (dispatch) => {
  const res = await axios.get(
    `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`
  );

  dispatch(covidActions.set_casos([res.data]));
}
export default covidSlice.reducer;