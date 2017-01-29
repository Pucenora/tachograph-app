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

class HomeView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    currentOdometerValue: React.PropTypes.number.isRequired,
    // from mapDispatchToProps:
    startTracking: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.startTracking = this.startTracking.bind(this);
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

  startTracking() {
    const self = this;
    Permissions.requestPermission('location')
    .then((response) => {
      self.setState({ locationPermission: response });

      if (response === 'authorized') {
        this.props.startTracking();
        Actions.tripRecording();
      }
    });
  }

  render() {
    const calculatedOdometerReadingString = Math.round(this.props.currentOdometerValue);
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>
            Aktueller Tachostand:
          </Text>
          <Text style={styles.infoValue}>
            { calculatedOdometerReadingString } km
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.startTracking}
          >
            <Text style={styles.buttonLabel}>Fahrt automatisch aufzeichnen</Text>
            <Icon name="cogs" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.tripBounds({
              trip: {
                startOdometerValue: this.props.currentOdometerValue,
              },
            })}
          >
            <Text style={styles.buttonLabel}>Fahrt manuell hinzufügen</Text>
            <Icon name="pencil" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentOdometerValue:
    state.trips.trips.default[state.trips.trips.default.length - 1].endOdometerValue,
});

const mapDispatchToProps = dispatch => ({
  startTracking: bindActionCreators(startTracking, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
