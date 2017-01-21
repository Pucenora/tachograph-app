export function setOdometer(odometerReading) {
  return {
    type: 'SET_ODOMETER',
    odometerReading,
    timestamp: Date.now(),
  };
}

export function addLogEntry(trip) {
  return {
    type: 'SAVE_TRIP',
    trip,
  };
}

export default {
  setOdometer,
  addLogEntry,
};
