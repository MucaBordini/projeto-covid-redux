import { createSlice } from '@reduxjs/toolkit';
import db from '../../services/db';

export const covidSlice = createSlice({
  name: 'covid',
  initialState: { 
    casos: [], 
    estados: []
  },
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
  const res = await db.get('cases');

  var casos = res.data;
  var estados = [];

  casos.forEach((caso) => {
    estados = [...estados, caso.estado]
  });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function compare(a, b) {
    const estadoA = a;
    const estadoB = b;
  
    let comparison = 0;
    if (estadoA > estadoB) {
      comparison = 1;
    } else if (estadoA < estadoB) {
      comparison = -1;
    }
    return comparison;
  }

  estados = estados.filter(onlyUnique).sort(compare);

  dispatch(covidActions.set_estados(estados));
}
export const find_casos = () => async (dispatch) => {
  const res = await db.get('cases');

  dispatch(covidActions.set_casos(res.data));
}
export const search_casos = (uf) => async (dispatch) => {
  if (uf !== "todos"){
    const res = await db.get(`cases?estado=${uf}`);

    dispatch(covidActions.set_casos(res.data));
  } else {
    dispatch(find_casos());
  }
}
export const register_caso = (estado, confirmados, mortes, suspeitas) => async (dispatch) => {
  await db.post('cases', {
    estado: estado,
    casos: confirmados,
    mortes: mortes,
    suspeitos: suspeitas,
    ultimaAtualizacao: new Date()
  }).then(() => {
    dispatch(find_casos());
  });
}
export default covidSlice.reducer;