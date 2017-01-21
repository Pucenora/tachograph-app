import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-awesome-button';
import { bindActionCreators } from 'redux';
import commonStyles from './commonStyles';
import { addLogEntry } from '../store/actions';

const styles = StyleSheet.create({

});

class LogEntryDetailView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startOdometerValue: props.startOdometerValue,
      endOdometerValue: props.endOdometerValue,
      inputChanged: false,
    };
    this.render = this.render.bind(this);
    this.addLogEntry = this.addLogEntry.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startOdometerValue: nextProps.startOdometerValue,
      endOdometervalue: nextProps.endOdometerValue,
    });
  }

  addLogEntry() {
    this.props.addLogEntry({
      tripType: 'private',
      startOdometerValue: this.state.startOdometerValue,
      endOdometerValue: this.state.endOdometerValue,
    });
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
                onPress: this.addLogEntry,
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

LogEntryDetailView.propTypes = {
  // from mapStateToProps:
  startOdometerValue: React.PropTypes.number,
  endOdometerValue: React.PropTypes.number,
  // from mapDispatchToProps:
  addLogEntry: React.PropTypes.func,
};

const mapStateToProps = state => ({
  startOdometerValue: state.odometer.odometerReadingAfterLastTrip,
  endOdometerValue: state.odometer.calculatedOdometerReading,
});

const mapDispatchToProps = dispatch => ({
  addLogEntry: bindActionCreators(addLogEntry, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogEntryDetailView);
