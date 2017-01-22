import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-awesome-button';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { bindActionCreators } from 'redux';
import commonStyles from './commonStyles';
import { verifyRecordedTrip } from '../store/actions';

const styles = StyleSheet.create({

});

class TripDetailView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startOdometerValue: props.trip.startOdometerValue,
      endOdometerValue: props.trip.endOdometerValue,
      inputChanged: false,
    };
    this.render = this.render.bind(this);
    this.verifyRecordedTrip = this.verifyRecordedTrip.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startOdometerValue: nextProps.trip.startOdometerValue,
      endOdometerValue: nextProps.trip.endOdometerValue,
    });
  }

  verifyRecordedTrip() {
    dismissKeyboard();
    this.props.verifyRecordedTrip();
  }

  render() {
    const startOdometerString = this.state.startOdometerValue
      && this.state.startOdometerValue.toString();
    const endOdometerString = this.state.endOdometerValue
      && this.state.endOdometerValue.toString();
    const buttonState = this.state.startOdometerValue > 0
      && this.state.endOdometerValue > this.state.startOdometerValue ? 'ready' : 'invalid';
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={commonStyles.inputs}>
          <View style={commonStyles.inputContainer}>
            <Icon name="tachometer" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value={startOdometerString}
              editable
              placeholder="Tachostand zu Fahrtbeginn in km"
              onChangeText={value =>
                this.setState({ startOdometerValue: parseInt(value, 10), inputChanged: true })}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              style={[commonStyles.input, commonStyles.blackFont]}
            />
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="tachometer" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value={endOdometerString}
              editable
              placeholder="Tachostand zu Fahrtende in km"
              onChangeText={value =>
                this.setState({ endOdometerValue: parseInt(value, 10), inputChanged: true })}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              style={[commonStyles.input, commonStyles.blackFont]}
            />
          </View>
        </View>
        <View>
          <AwesomeButton
            backgroundStyle={commonStyles.signin}
            labelStyle={styles.buttonLabel}
            transitionDuration={200}
            states={{
              invalid: {
                text: 'Eintragen',
                backgroundColor: '#B69099',
              },
              ready: {
                text: 'Eintragen',
                onPress: this.verifyRecordedTrip,
                backgroundColor: '#FF3366',
              },
            }}
            buttonState={buttonState}
          />
        </View>
      </ScrollView>
    );
  }
}

TripDetailView.propTypes = {
  // from mapStateToProps:
  trip: React.PropTypes.object,
  // from mapDispatchToProps:
  verifyRecordedTrip: React.PropTypes.func,
};

const mapStateToProps = state => ({
  trip: state.trips.trips[state.trips.trips.length - 1],
});

const mapDispatchToProps = dispatch => ({
  verifyRecordedTrip: bindActionCreators(verifyRecordedTrip, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripDetailView);
