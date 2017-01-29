export function addCar(car) {
  return {
    type: 'ADD_CAR',
    car,
  };
}

export function updateCar(carId, updatedCar) {
  return {
    type: 'UPDATE_CAR',
    carId,
    updatedCar,
  };
}

export function setOdometer(carId, odometerReading) {
  return {
    type: 'SET_INITIAL_ODOMETER_OFFSET',
    carId,
    odometerReading,
  };
}

export default {
  addCar,
  updateCar,
  setOdometer,
};
