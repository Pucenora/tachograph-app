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
import AwesomeButton from 'react-native-awesome-button';
import Button from 'react-native-button';
import commonStyles from './commonStyles';

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

class HomeView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const calculatedOdometerReading = this.props.calculatedOdometerReading;
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Aktueller Tachostand: { calculatedOdometerReading } km
          </Text>
          <Button>korrigieren</Button>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>Betriebsfahrt aufzeichnen</Text>
            <Icon name="suitcase" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>Arbeitsweg aufzeichnen</Text>
            <Icon name="building" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>Privatfahrt aufzeichnen</Text>
            <Icon name="home" style={styles.buttonIcon} size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

HomeView.propTypes = {
  // from mapStateToProps:
  calculatedOdometerReading: React.PropTypes.number,
  // from mapDispatchToProps:
};

const mapStateToProps = state => ({
  calculatedOdometerReading: state.odometer.calculatedOdometerReading,
});

export default connect(mapStateToProps, null)(HomeView);
