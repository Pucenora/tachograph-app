const INITIAL_STATE = {
  initialOdometerReading: null,
  latestOdometerReading: null,
  latestOdometerUpdate: null,
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
      };
    default:
      return state;
  }
}
