const INITIAL_STATE = {
  initialOdometerReading: null,
  latestOdometerReading: null,
  latestOdometerUpdate: null,
  odometerReadingAfterLastTrip: null,
  calculatedOdometerReading: null,
};

export default function OdometerReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE;
    case 'SET_ODOMETER':
      return {
        ...state,
        initialOdometerReading: state.initialOdometerReading
          ? state.initialOdometerReading : action.odometerReading,
        latestOdometerReading: action.odometerReading,
        latestOdometerUpdate: action.timestamp,
        calculatedOdometerReading: action.odometerReading,
        odometerReadingAfterLastTrip: action.odometerReading,
      };
    case 'RECEIVE_TRIP_DISTANCE_CHANGED':
      return {
        ...state,
        calculatedOdometerReading: state.odometerReadingAfterLastTrip + action.tripDistance,
      };
    case 'SAVE_TRIP': {
      const newCalculatedOdometerReading = state.odometerReadingAfterLastTrip + action.tripDistance;
      return {
        ...state,
        odometerReadingAfterLastTrip: newCalculatedOdometerReading,
        calculatedOdometerReading: newCalculatedOdometerReading,
      };
    }
    default:
      return state;
  }
}
