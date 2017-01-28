import { AsyncStorage, DeviceEventEmitter } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import {
  receiveTripDistanceChanged,
} from './actions/TrackingActions';
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
  } else {
    // store.dispatch(setupTrackingService());

    DeviceEventEmitter.addListener('TRIP_DISTANCE_CHANGED', (e) => {
      store.dispatch(receiveTripDistanceChanged(e.tripDistanceMeters, e.currentAccuracy));
    });
    DeviceEventEmitter.addListener('ANDROID_ACTIVITY_RESUMED', () => {
      // Nothing to do right now
    });
  }
});
