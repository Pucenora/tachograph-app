const INITIAL_STATE = {
  drivers: [],
};

export default function DriversReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE;
    case 'ADD_DRIVER': {
      return {
        ...state,
        drivers: [
          ...state.drivers,
          action.driver,
        ],
      };
    }
    default:
      return state;
  }
}
