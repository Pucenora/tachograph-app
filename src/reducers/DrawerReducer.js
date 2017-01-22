import { ActionConst } from 'react-native-router-flux';

const INITIAL_STATE = {
  drawerOpen: false,
};

export default function DrawerReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
        // Close drawer after switching between it's tabs
        drawerOpen: ['tripRecording', 'tripList', 'manageCars', 'manageDrivers', 'imprint'].indexOf(action.scene.name) >= 0 ? false : state.drawerOpen,
      };
    case 'DRAWER_OPEN_STATE_CHANGED':
      return {
        ...state,
        drawerOpen: action.open,
      };
    case 'LOGGED_OUT':
      return INITIAL_STATE;
    default:
      return state;
  }
}
