export function setOdometer(odometerReading) {
  return {
    type: 'SET_INITIAL_ODOMETER_OFFSET',
    odometerReading,
  };
}

export function verifyRecordedTrip() {
  return {
    type: 'VERIFY_RECORDED_TRIP',
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
