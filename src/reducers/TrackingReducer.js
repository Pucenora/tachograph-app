const INITIAL_STATE = {
  currentAccuracy: -1,
  tripDistanceMeters: 0,
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
    case 'RECEIVE_TRIP_DISTANCE_CHANGED':
      return {
        ...state,
        currentAccuracy: action.currentAccuracy,
        tripDistanceMeters: action.tripDistanceMeters,
      };
    default:
      return state;
  }
}
