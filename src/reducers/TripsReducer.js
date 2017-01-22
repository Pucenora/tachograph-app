const INITIAL_STATE = {
  trips: [],
};

function updateLastItem(items, updatedItem) {
  return items.map((item, index) => {
    if (index === items.length) {
      return {
        ...item,
        ...updatedItem,
      };
    }
    return item;
  });
}

export default function TripsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE;
    case 'SET_INITIAL_ODOMETER_OFFSET':
      return {
        ...state,
        trips: [{
          type: 'initialOffset',
          endOdometerValue: action.odometerReading,
          endTimestamp: Date.now(),
          verificationTimestamp: Date.now(),
        }],
      };
    case 'TRIP_RECORDING_STARTED': {
      const lastOdometerValue = state.trips[state.trips.length - 1].endOdometerValue;
      const newTrip = {
        type: action.tripType,
        startTimestamp: Date.now(),
        startOdometerValue: lastOdometerValue,
        endTimestamp: Date.now(),
        endOdometerValue: lastOdometerValue,
      };
      return {
        ...state,
        trips: [
          ...state.trips,
          newTrip,
        ],
      };
    }
    case 'RECEIVE_TRIP_DISTANCE_CHANGED':
      return {
        ...state,
        trips: updateLastItem(state.trips, {
          endOdometerValue:
            state.trips[state.trips.length - 1].startOdometerValue + action.tripDistance,
          endTimestamp: Date.now(),
        }),
      };
    case 'VERIFIED_RECORDED_TRIP': {
      return {
        ...state,
        trips: updateLastItem(state.trips, {
          verificationTimestamp: Date.now(),
        }),
      };
    }
    default:
      return state;
  }
}
