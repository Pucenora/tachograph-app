// import { Actions } from 'react-native-router-flux';
// function verifiedRecordedTrip() {
//   return {
//     type: 'VERIFIED_RECORDED_TRIP',
//   };
// }
//
// export function verifyRecordedTrip() {
//   return (dispatch) => {
//     dispatch(verifiedRecordedTrip());
//     Actions.home();
//   };
// }

export function addTrip(trip, tripIndex) {
  return {
    type: 'ADD_TRIP',
    trip,
    tripIndex,
  };
}

export function updateTrip(tripIndex, updatedTrip) {
  return {
    type: 'UPDATE_TRIP',
    tripIndex,
    updatedTrip,
  };
}

export default {
  addTrip,
  updateTrip,
  // verifyRecordedTrip,
};
