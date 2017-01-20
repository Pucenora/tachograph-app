export function setOdometer(odometerReading) {
  return {
    type: 'SET_ODOMETER',
    odometerReading,
    timestamp: Date.now(),
  };
}

export default {
  setOdometer,
};
