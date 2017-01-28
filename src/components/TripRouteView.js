import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-awesome-button';
import Button from 'react-native-button';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import commonStyles from './commonStyles';

const styles = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
});

class TripRouteView extends React.Component {

  static propTypes = {
    tripIndex: React.PropTypes.number,
    // from mapStateToProps:
    trip: React.PropTypes.object,
    // from mapDispatchToProps:
  };

  static defaultProps = {
    tripIndex: -1,
  };

  render() {
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={commonStyles.inputs}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Startadresse</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="map-marker" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value=""
              editable
              placeholder="Adresse"
              onChangeText={value => value}
              underlineColorAndroid="transparent"
              style={[commonStyles.input, commonStyles.blackFont]}
            />
          </View>
          <View style={{ height: 30 }} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>über</Text>
          </View>
          <Button>Zwischenziel hinzufügen</Button>
          <View style={{ height: 30 }} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Zieladresse</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Icon name="map-marker" style={commonStyles.inputUsername} size={30} />
            <TextInput
              value=""
              editable
              placeholder="Zieladresse"
              onChangeText={value => value}
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
                text: 'Weiter',
                backgroundColor: '#B69099',
              },
              ready: {
                text: 'Weiter',
                onPress: Actions.tripPurpose,
                backgroundColor: '#FF3366',
              },
            }}
            buttonState="ready"
          />
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
  if (ownProps.tripIndex) {
    return {
      trip: state.trips.trips[ownProps.tripIndex],
    };
  }
  return {
    trip: state.trips.trips[state.trips.trips.length - 1],
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TripRouteView);
