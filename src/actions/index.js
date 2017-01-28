export function setOdometer(odometerReading) {
  return {
    type: 'SET_INITIAL_ODOMETER_OFFSET',
    odometerReading,
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
  drawerOpenStateChanged,
};
