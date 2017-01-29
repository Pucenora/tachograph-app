const INITIAL_STATE = {
  cars: [],
};

export default function CarsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE;
    case 'ADD_CAR': {
      return {
        ...state,
        cars: [
          ...state.cars,
          action.car,
        ],
      };
    }
    default:
      return state;
  }
}
