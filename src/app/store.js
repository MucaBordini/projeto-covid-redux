import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import covidReducer from '../features/covid/covidSlice';

export default configureStore({
  reducer: {
    'covid': covidReducer,
  },
});
