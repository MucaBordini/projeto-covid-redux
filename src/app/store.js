import { configureStore } from '@reduxjs/toolkit';
import covidReducer from '../features/covid/covidSlice';
import headerReducer from '../features/header/headerSlice'

export default configureStore({
  reducer: {
    'covid': covidReducer,
    'user': headerReducer
  },
});
