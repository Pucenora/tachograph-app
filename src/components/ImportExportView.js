import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import RNFS from 'react-native-fs';
import moment from 'moment';
import commonStyles from './commonStyles';

const styles = StyleSheet.create({

});

class ImportExportView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    trips: React.PropTypes.array.isRequired,
    // from mapDispatchToProps:
  };

  constructor(props) {
    super(props);
    this.export = this.export.bind(this);
  }

  export() {
    const path = `${RNFS.ExternalStorageDirectoryPath}/fahrtenbuch.csv`;

    let csvExport = 'Datum,Fahrzeit,Fahrstrecke,Reisezweck,Kilometerstand Fahrt-Beginn,Kilometerstand Fahrt-Ende,km gesch.,km privat,km Arbeitsweg\n';

    this.props.trips.forEach((trip) => {
      if (trip.type === 'initialOffset') {
        return;
      }
      const startDate = moment(trip.startTimestamp).format('DD.MM.YY');
      const startTime = moment(trip.startTimestamp).format('hh:mm');
      const endTime = moment(trip.endTimestamp).format('hh:mm');
      const tripRoute = '';
      const tripPurpose = '';
      const startKm = trip.startOdometerValue;
      const endKm = trip.endOdometerValue;
      const distanceBusiness = 0;
      const distancePrivate = trip.endOdometerValue - trip.startOdometerValue;
      const distanceCommute = 0;
      csvExport += `${startDate},${startTime}-${endTime},${tripRoute},${tripPurpose},${startKm},${endKm},${distanceBusiness},${distancePrivate},${distanceCommute}\n`;
    });

    // write the file
    RNFS.writeFile(path, csvExport, 'utf8')
      .then(() => {
        Alert.alert('Fahrtenbuch wurde erfolgreich nach folgendem Pfad exportiert:', path);
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  }

  render() {
    return (
      <ScrollView style={commonStyles.container} keyboardShouldPersistTaps="always">
        <Button
          style={{ marginTop: 20 }}
          onPress={this.export}
        >
          Exportieren
        </Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips.trips.default,
});

export default connect(mapStateToProps, null)(ImportExportView);
