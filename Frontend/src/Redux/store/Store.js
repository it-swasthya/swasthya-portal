import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../reducers/TestReducer'; // path to your reducer
import { userAuthReducer } from '../reducers/UserAuthReducer';

const store = configureStore({
  reducer: {
    tests: testReducer, 
    userAuthReducer,
  },
});

export default store;
