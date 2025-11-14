import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: {
    name: 'Holberton Dashboard',
    trace: true,
    traceLimit: 25
  }
});

export default store;
