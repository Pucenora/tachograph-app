import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import DatePicker from 'react-native-datepicker';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import commonStyles from './commonStyles';
import { addTrip, updateTrip } from '../actions/TripActions';

const styles = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  tripButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
  },
  tripTypeButton: {
    backgroundColor: '#219bbe',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tripButtonLabel: {
    color: 'white',
    textAlign: 'center',
  },
  tripButtonIcon: {
    color: 'white',
    margin: 5,
  },
});

class TripBoundsView extends React.Component {

  static propTypes = {
    tripIndex: React.PropTypes.number,
    // from mapStateToProps:
    trip: React.PropTypes.object,
    // from mapDispatchToProps:
    addTrip: React.PropTypes.func.isRequired,
    updateTrip: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    tripIndex: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      startTimestamp: props.trip.startTimestamp,
      endTimestamp: props.trip.endTimestamp,
      startOdometerValue: props.trip.startOdometerValue,
      endOdometerValue: props.trip.endOdometerValue,
    };
    this.saveTrip = this.saveTrip.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startTimestamp: nextProps.trip.startTimestamp,
      endTimestamp: nextProps.trip.endTimestamp,
      startOdometerValue: nextProps.trip.startOdometerValue,
      endOdometerValue: nextProps.trip.endOdometerValue,
    });
  }

  saveTrip(tripType) {
    dismissKeyboard();
    if (this.props.tripIndex) {
      this.props.updateTrip(this.props.tripIndex, {
        ...this.props.trip,
        startTimestamp: this.state.startTimestamp,
        endTimestamp: this.state.endTimestamp,
        startOdometerValue: this.state.startOdometerValue,
        endOdometerValue: this.state.endOdometerValue,
        type: tripType,
      });
    } else {
      this.props.addTrip({
        ...this.props.trip,
        startTimestamp: this.state.startTimestamp,
        endTimestamp: this.state.endTimestamp,
        startOdometerValue: this.state.startOdometerValue,
        endOdometerValue: this.state.endOdometerValue,
        type: tripType,
      });
    }

    Actions.pop();
  }

  render() {
    const startDate = this.state.startTimestamp ? new Date(this.state.startTimestamp) : new Date();
    const endDate = this.state.endTimestamp ? new Date(this.state.endTimestamp) : new Date();
    const startOdometerString = this.state.startOdometerValue
      && this.state.startOdometerValue.toString();
    const endOdometerString = this.state.endOdometerValue
      && this.state.endOdometerValue.toString();
    // const buttonState = this.state.startOdometerValue > 0
    //   && this.state.endOdometerValue > this.state.startOdometerValue ? 'ready' : 'invalid';
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={commonStyles.inputs}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Fahrtbeginn</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="calendar" style={commonStyles.inputUsername} size={30} />
            <DatePicker
              style={{
                position: 'absolute',
                left: 61,
                top: 12,
                right: 0,
                height: 40,
                width: 200,
              }}
              date={startDate}
              mode="datetime"
              placeholder="Startdatum/-zeit der Fahrt"
              is24Hour
              format="DD.MM.YYYY HH:mm"
              confirmBtnText="OK"
              cancelBtnText="Abbrechen"
              showIcon={false}
              customStyles={{
                dateInput: {
                  alignItems: 'flex-start',
                  borderWidth: 0,
                },
                placeholderText: {
                  color: '#9e9e9e',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={dateString => this.setState({
                startTimestamp: moment(dateString, 'DD.MM.YYYY HH:mm').valueOf(),
              })}
            />
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="tachometer" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value={startOdometerString}
              editable
              placeholder="Tachostand zu Fahrtbeginn in km"
              onChangeText={newStartOdometerValue => this.setState({
                startOdometerValue: parseInt(newStartOdometerValue, 10),
              })}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              style={[commonStyles.input, commonStyles.blackFont]}
            />
          </View>
          <View style={{ height: 30 }} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Fahrtende</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="calendar" style={commonStyles.inputUsername} size={30} />
            <DatePicker
              style={{
                position: 'absolute',
                left: 61,
                top: 12,
                right: 0,
                height: 40,
                width: 200,
              }}
              date={endDate}
              mode="datetime"
              placeholder="Startdatum/-zeit der Fahrt"
              is24Hour
              format="DD.MM.YYYY HH:mm"
              confirmBtnText="OK"
              cancelBtnText="Abbrechen"
              showIcon={false}
              customStyles={{
                dateInput: {
                  alignItems: 'flex-start',
                  borderWidth: 0,
                },
                placeholderText: {
                  color: '#9e9e9e',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={dateString => this.setState({
                endTimestamp: moment(dateString, 'DD.MM.YYYY HH:mm').valueOf(),
              })}
            />
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="tachometer" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value={endOdometerString}
              editable
              placeholder="Tachostand zu Fahrtende in km"
              onChangeText={newEndOdometerValue => this.setState({
                endOdometerValue: parseInt(newEndOdometerValue, 10),
              })}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              style={[commonStyles.input, commonStyles.blackFont]}
            />
          </View>
        </View>
        <View style={styles.tripButtonsContainer}>
          <TouchableOpacity
            style={styles.tripTypeButton}
            onPress={Actions.tripRoute}
          >
            <Text style={styles.tripButtonLabel}>Betriebsfahrt</Text>
            <Icon name="suitcase" style={styles.tripButtonIcon} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tripTypeButton}
            onPress={() => this.saveTrip('commute')}
          >
            <Text style={styles.tripButtonLabel}>Arbeitsweg</Text>
            <Icon name="building" style={styles.tripButtonIcon} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tripTypeButton}
            onPress={() => this.saveTrip('private')}
          >
            <Text style={styles.tripButtonLabel}>Privatfahrt</Text>
            <Icon name="home" style={styles.tripButtonIcon} size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.trip) {
    return {
      trip: ownProps.trip,
    };
  }
  if (Number.isInteger(ownProps.tripIndex) && ownProps.tripIndex >= 0) {
    return {
      trip: state.trips.trips[ownProps.tripIndex],
      tripIndex: ownProps.tripIndex,
    };
  }
  return {
    trip: state.trips.trips[state.trips.trips.length - 1],
    tripIndex: state.trips.trips.length - 1,
  };
};

const mapDispatchToProps = dispatch => ({
  addTrip: bindActionCreators(addTrip, dispatch),
  updateTrip: bindActionCreators(updateTrip, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripBoundsView);
