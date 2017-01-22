import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import commonStyles from './commonStyles';
import { stopTracking } from '../tracking/TrackingActions';

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#AA3366',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#F0F0F0',
    marginBottom: 5,
  },
  buttonIcon: {
    color: '#F0F0F0',
  },
});

class TripRecordingView extends React.Component {

  constructor(props) {
    super(props);
    this.stopTracking = this.stopTracking.bind(this);
  }

  stopTracking() {
    this.props.stopTracking();
    Actions.tripDetail();
  }

  render() {
    const calculatedOdometerReadingString = Math.round(
      this.props.trip.endOdometerReading * 10) / 10;
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Aktueller Tachostand: { calculatedOdometerReadingString } km
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.stopTracking()}
          >
            <Text style={styles.buttonLabel}>Aufzeichnung beenden</Text>
            <Icon name="stop" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

TripRecordingView.propTypes = {
  // from mapStateToProps:
  trip: React.PropTypes.object,
  // from mapDispatchToProps:
  stopTracking: React.PropTypes.func,
};

const mapStateToProps = state => ({
  trip: state.trips.trips[state.trips.trips.length - 1],
});

const mapDispatchToProps = dispatch => ({
  stopTracking: bindActionCreators(stopTracking, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripRecordingView);
