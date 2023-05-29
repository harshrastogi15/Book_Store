import {configureStore} from '@reduxjs/toolkit';
import userreducer from './reducers/user';

const store = configureStore({
  reducer: {
    user: userreducer,
  },
});

export default store;
