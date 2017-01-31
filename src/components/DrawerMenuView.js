import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuItem: {
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    height: 30,
    width: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 20,
    marginTop: 5,
  },
  currentCarHeader: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 18,
  },
  carImageButton: {
    marginLeft: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  carName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

class DrawerMenuView extends React.Component {

  static propTypes = {
    // from mapStateToProps
    carName: React.PropTypes.string,
    carImage: React.PropTypes.string,
  }

  static defaultProps = {
    carName: '',
    carImage: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.currentCarHeader}>Aktuelles Fahrzeug:</Text>
        <TouchableOpacity
          style={styles.carImageButton}
        >
          <Image
            style={styles.carImage}
            source={{ uri: this.props.carImage }}
          />
          <Text style={styles.carName}>{ this.props.carName }</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.tripsTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="list" size={26} />
          </View>
          <Text style={styles.menuItemText}>Fahrtenbuch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.carsTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="car" size={26} />
          </View>
          <Text style={styles.menuItemText}>Fahrzeuge verwalten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.driversTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="user" size={26} />
          </View>
          <Text style={styles.menuItemText}>Fahrer verwalten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.importExportTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="download" size={26} />
          </View>
          <Text style={styles.menuItemText}>Import/Export</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.aboutTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="info" size={26} />
          </View>
          <Text style={styles.menuItemText}>Über die App</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  carName: state.cars.cars[0].name,
  carImage: state.cars.cars[0].image,
});

export default connect(mapStateToProps, null)(DrawerMenuView);
