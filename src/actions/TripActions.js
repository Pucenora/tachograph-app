export function addTrip(trip, tripIndex) {
  return {
    type: 'ADD_TRIP',
    trip,
    tripIndex,
    carId: 'default',
  };
}

export function updateTrip(tripIndex, updatedTrip) {
  return {
    type: 'UPDATE_TRIP',
    tripIndex,
    updatedTrip,
    carId: 'default',
  };
}

export default {
  addTrip,
  updateTrip,
};
