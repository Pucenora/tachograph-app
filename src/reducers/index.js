import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';
import TrackingReducer from './TrackingReducer';
import TripsReducer from './TripsReducer';
import DrawerReducer from './DrawerReducer';

function appReducer(state = {}, action) {
  if (action.type === REHYDRATE) {
    return {
      initialized: true,
    };
  }

  return state;
}

export default combineReducers({
  app: appReducer,
  trips: TripsReducer,
  drawer: DrawerReducer,
  tracking: TrackingReducer,
});
