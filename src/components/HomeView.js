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
import Button from 'react-native-button';
import { bindActionCreators } from 'redux';
import Permissions from 'react-native-permissions';
import { Actions } from 'react-native-router-flux';
import commonStyles from './commonStyles';
import { startTracking } from '../actions/TrackingActions';

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#219bbe',
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

class HomeView extends React.Component {

  constructor(props) {
    super(props);
    this.requestLocationPermission = this.requestLocationPermission.bind(this);
    this.state = {
      locationPermission: 'undetermined',
    };
  }

  componentDidMount() {
    const self = this;
    Permissions.getPermissionStatus('location')
    .then((response) => {
      self.setState({ locationPermission: response });
    });
  }

  requestLocationPermission(tripType) {
    const self = this;
    Permissions.requestPermission('location')
    .then((response) => {
      self.setState({ locationPermission: response });

      if (response === 'authorized') {
        this.props.startTracking(tripType);
        Actions.tripRecording();
      }
    });
  }

  render() {
    const calculatedOdometerReadingString = Math.round(
      this.props.trip.endOdometerValue * 10) / 10;
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Aktueller Tachostand: { calculatedOdometerReadingString } km
          </Text>
          <Button>korrigieren</Button>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.requestLocationPermission('business')}
          >
            <Text style={styles.buttonLabel}>Betriebsfahrt aufzeichnen</Text>
            <Icon name="suitcase" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.requestLocationPermission('work')}
          >
            <Text style={styles.buttonLabel}>Arbeitsweg aufzeichnen</Text>
            <Icon name="building" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.requestLocationPermission('private')}
          >
            <Text style={styles.buttonLabel}>Privatfahrt aufzeichnen</Text>
            <Icon name="home" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={Actions.tripDetail}
          >
            <Text style={styles.buttonLabel}>Eintrag manuell hinzufügen</Text>
            <Icon name="pencil" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

HomeView.propTypes = {
  // from mapStateToProps:
  trip: React.PropTypes.object,
  // from mapDispatchToProps:
  startTracking: React.PropTypes.func,
};

const mapStateToProps = state => ({
  trip: state.trips.trips[state.trips.trips.length - 1],
});

const mapDispatchToProps = dispatch => ({
  startTracking: bindActionCreators(startTracking, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
