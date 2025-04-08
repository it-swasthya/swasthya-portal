import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../reducers/TestReducer'; // path to your reducer

const store = configureStore({
  reducer: {
    tests: testReducer, // This MUST match the `state.tests` you're accessing in selectors
  },
});

export default store;
