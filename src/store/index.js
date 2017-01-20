import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const middlewares = [
  thunkMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
  autoRehydrate(),
];

const store = createStore(reducer, compose(...enhancers));

export default store;

persistStore(store, { storage: AsyncStorage }, (err) => {
  if (err) {
    console.error('Error while rehydrate app state:', err);
  }
});
