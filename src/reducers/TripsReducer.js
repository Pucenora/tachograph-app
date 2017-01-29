const INITIAL_STATE = {
  trips: {},
};

function updateLastItem(items, updatedItem) {
  return items.map((item, index) => {
    if (index === items.length - 1) {
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
        trips: {
          ...state.trips,
          [action.carId]: [{
            type: 'initialOffset',
            endOdometerValue: action.odometerReading,
            endTimestamp: Date.now(),
            verificationTimestamp: Date.now(),
          }],
        },
      };
    case 'TRIP_RECORDING_STARTED': {
      const lastOdometerValue = state.trips[state.trips.length - 1].endOdometerValue;
      const newTrip = {
        startTimestamp: Date.now(),
        startOdometerValue: lastOdometerValue,
        endTimestamp: Date.now(),
        endOdometerValue: lastOdometerValue,
      };
      return {
        ...state,
        trips: {
          ...state.trips,
          [action.carId]: [
            ...state.trips[action.carId],
            newTrip,
          ],
        },
      };
    }
    case 'RECEIVE_TRIP_DISTANCE_CHANGED': {
      console.log(`RECEIVE_TRIP_DISTANCE_CHANGED: ${action.tripDistanceMeters}m (acc: ${action.currentAccuracy}m)`);
      return {
        ...state,
        trips: {
          ...state.trips,
          [action.carId]: updateLastItem(state.trips[action.carId], {
            endOdometerValue:
              state.trips[state.trips.length - 1].startOdometerValue
              + Math.floor(action.tripDistanceMeters / 1000),
            endTimestamp: Date.now(),
          }),
        },
      };
    }
    case 'ADD_CAR': {
      return {
        ...state,
        trips: {
          ...state.trips,
          [action.car.id]: [],
        },
      };
    }
    case 'ADD_TRIP': {
      return {
        ...state,
        trips: {
          ...state.trips,
          [action.carId]: [
            ...state.trips[action.carId],
            action.trip,
          ],
        },
      };
    }
    case 'UPDATE_TRIP': {
      return {
        ...state,
        trips: {
          ...state.trips,
          [action.carId]: state.trips[action.carId].map((trip, index) => {
            if (index === action.tripIndex) {
              return {
                ...trip,
                ...action.updatedTrip,
                lastUpdate: Date.now(),
              };
            }
            return trip;
          }),
        },
      };
    }
    default:
      return state;
  }
}
