const INITIAL_STATE = {
};

export default function OdometerReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}
