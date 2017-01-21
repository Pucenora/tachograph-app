const INITIAL_STATE = {
  trips: [],
  recordingTripType: null,
};

export default function OdometerReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE;
    case 'TRACKING_STARTED':
      return {
        ...state,
        recordingTripType: action.tripType,
      };
    case 'SAVE_TRIP':
      return {
        ...state,
        trips: [
          ...state.trips,
          action.trip,
        ],
      };
    default:
      return state;
  }
}
