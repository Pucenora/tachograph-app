import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';
import TripsReducer from '../reducers/TripsReducer';
import DrawerReducer from '../reducers/DrawerReducer';

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
});
