import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';
import OdometerReducer from '../reducers/OdometerReducer';
import TripRecordingsReducer from '../reducers/TripRecordingsReducer';

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
  odometer: OdometerReducer,
  tripRecordings: TripRecordingsReducer,
});
