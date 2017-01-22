import { Actions } from 'react-native-router-flux';

export function setOdometer(odometerReading) {
  return {
    type: 'SET_INITIAL_ODOMETER_OFFSET',
    odometerReading,
  };
}

function verifiedRecordedTrip() {
  return {
    type: 'VERIFIED_RECORDED_TRIP',
  };
}

export function verifyRecordedTrip() {
  return (dispatch) => {
    dispatch(verifiedRecordedTrip());
    Actions.home();
  };
}

export function drawerOpenStateChanged(open) {
  return {
    type: 'DRAWER_OPEN_STATE_CHANGED',
    open,
  };
}

export default {
  setOdometer,
  verifyRecordedTrip,
  drawerOpenStateChanged,
};
