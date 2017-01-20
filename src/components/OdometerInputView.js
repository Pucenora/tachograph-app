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
import { setOdometer } from '../store/actions';

const styles = StyleSheet.create({

});

class OdometerInputView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newOdometerValue: null,
      inputChanged: false,
    };
    this.render = this.render.bind(this);
    this.setOdometerReading = this.setOdometerReading.bind(this);
  }

  setOdometerReading() {
    this.props.setOdometer(this.state.newOdometerValue);
  }

  render() {
    const newOdometerValue = this.state.newOdometerValue && this.state.newOdometerValue.toString();
    const buttonState = newOdometerValue > 0 ? 'ready' : 'invalid';
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            Please insert the current odometer reading:
          </Text>
        </View>
        <View style={commonStyles.inputs}>
          <View style={commonStyles.inputContainer}>
            <Icon name="tachometer" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value={newOdometerValue}
              editable
              placeholder="Tachostand in km"
              onChangeText={value =>
                this.setState({ newOdometerValue: parseInt(value, 10), inputChanged: true })}
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
                text: 'Bestätigen',
                backgroundColor: '#B69099',
              },
              ready: {
                text: 'Bestätigen',
                onPress: this.setOdometerReading,
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

OdometerInputView.propTypes = {
  // from mapStateToProps:
  // from mapDispatchToProps:
  setOdometer: React.PropTypes.func,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setOdometer: bindActionCreators(setOdometer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OdometerInputView);
