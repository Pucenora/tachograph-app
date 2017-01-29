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
import commonStyles from './commonStyles';
import { stopTracking } from '../actions/TrackingActions';

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
  infoSection: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoValue: {
    fontSize: 20,
  },
});

class TripRecordingView extends React.Component {

  constructor(props) {
    super(props);
    this.stopTracking = this.stopTracking.bind(this);
  }

  stopTracking() {
    this.props.stopTracking();
  }

  render() {
    const calculatedOdometerReadingString = Math.round(this.props.endOdometerValue);
    const tripDistanceMeters = Math.round(this.props.tripDistanceMeters);
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>
            Aktuellere Fahrt:
          </Text>
          <Text style={styles.infoValue}>
            { tripDistanceMeters } m
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>
            Berechneter Tachostand:
          </Text>
          <Text style={styles.infoValue}>
            { calculatedOdometerReadingString } km
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>
            GPS-Genauigkeit:
          </Text>
          <Text style={styles.infoValue}>
            { this.props.currentAccuracy < 0 ? 'unbekannt' : `${this.props.currentAccuracy} m` }
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
  endOdometerValue: React.PropTypes.number.isRequired,
  currentAccuracy: React.PropTypes.number.isRequired,
  tripDistanceMeters: React.PropTypes.number.isRequired,
  // from mapDispatchToProps:
  stopTracking: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  endOdometerValue: state.trips.trips.default[state.trips.trips.length - 1].endOdometerValue,
  tripDistanceMeters: state.tracking.tripDistanceMeters,
  currentAccuracy: state.tracking.currentAccuracy,
});

const mapDispatchToProps = dispatch => ({
  stopTracking: bindActionCreators(stopTracking, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripRecordingView);
