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

export function addTrip(trip) {
  return {
    type: 'ADD_TRIP',
    trip,
  };
}

export default {
  addTrip,
  // verifyRecordedTrip,
};
