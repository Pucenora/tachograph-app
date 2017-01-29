export function addDriver(driver) {
  return {
    type: 'ADD_DRIVER',
    driver,
  };
}

export function updateDriver(driverId, updatedDriver) {
  return {
    type: 'UPDATE_DRIVER',
    driverId,
    updatedDriver,
  };
}

export default {
  addDriver,
  updateDriver,
};
