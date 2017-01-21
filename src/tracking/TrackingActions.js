import { Platform } from 'react-native';
import TrackingManager from './TrackingManager';

function trackingStopped() {
  return {
    type: 'TRACKING_STOPPED',
  };
}

export function stopTracking() {
  return (dispatch) => {
    dispatch(trackingStopped());
    TrackingManager.stopTracking();
  };
}

function trackingStarted(tripType) {
  return {
    type: 'TRACKING_STARTED',
    tripType,
  };
}

export function startTracking(tripType) {
  return (dispatch) => {
    dispatch(trackingStarted(tripType));
    if (Platform.OS === 'android') {
      TrackingManager.startTracking();
    }
  };
}

export function receiveTripDistanceChanged(tripDistance) {
  return {
    type: 'RECEIVE_TRIP_DISTANCE_CHANGED',
    tripDistance,
    timestamp: Date.now(),
  };
}

export default {
  startTracking,
  stopTracking,
  receiveTripDistanceChanged,
};
