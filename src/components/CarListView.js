import React from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  carItem: {
    flexDirection: 'row',
  },
  carImage: {
    width: 100,
    height: 75,
    borderRadius: 10,
    margin: 10,
  },
  carDetails: {
    padding: 5,
  },
  carName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

class CarListView extends React.Component {

  static propTypes = {
    // from mapStateToProps:
    cars: React.PropTypes.array.isRequired,
    // from mapDispatchToProps:
  };

  static renderCar(car) {
    return (
      <TouchableOpacity
        style={styles.carItem}
        key={car.id}
      >
        <Image
          style={styles.carImage}
          source={{ uri: car.image }}
        />
        <View style={styles.carDetails}>
          <Text style={styles.carName}>{ car.name }</Text>
          <Text style={styles.carOdometervalue}>
            Aktueller Kilometerstand: { car.currentOdometerValue }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  static renderActionButtons() {
    return (
      <ActionButton buttonColor="#22CCDD" bgColor="rgba(0, 0, 0, 0.6)">
        <ActionButton.Item
          buttonColor="#3498db"
          title={I18n.t('CarListView_action_button_add_car')}
          onPress={Actions.carDetail}
        >
          <Icon name="plus" size={30} color="#fff" />
        </ActionButton.Item>
      </ActionButton>
    );
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.cars),
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={CarListView.renderCar}
          renderSeparator={() => <View style={{ height: 1, backgroundColor: '#CCCCCC' }} />}
          enableEmptySections
        />
        { CarListView.renderActionButtons() }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cars: state.cars.cars.map(car => ({
    ...car,
    currentOdometerValue:
      state.trips.trips[car.id][state.trips.trips.default.length - 1].endOdometerValue,
  })),
});

export default connect(mapStateToProps, null)(CarListView);
