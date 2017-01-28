import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Navigator,
} from 'react-native';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { drawerOpenStateChanged } from '../actions';

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
  closeDrawerButton: {
    justifyContent: 'center',
    marginLeft: 20,
    flex: 1,
  },
  closeDrawerButtonImage: {
    width: 30,
    height: 30,
  },
});

const navbarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

class DrawerMenuView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: navbarHeight,
  //          backgroundColor: colors.drawerTopBackgroundColor,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.drawerOpenStateChanged(false)}
            style={styles.closeDrawerButton}
          >
            {/* <Image
              style={styles.closeDrawerButtonImage}
              source={require('../assets/menu_open.png')}
            /> */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={Actions.newTripTab}
          style={[styles.menuItem, { marginTop: 20 }]}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="plus" size={26} />
          </View>
          <Text style={styles.menuItemText}>Neue Fahrt</Text>
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
          onPress={Actions.manageCarsTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="car" size={26} />
          </View>
          <Text style={styles.menuItemText}>Fahrzeuge verwalten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.manageDriversTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="user" size={26} />
          </View>
          <Text style={styles.menuItemText}>Fahrer verwalten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.imprintTab}
          style={styles.menuItem}
        >
          <View style={styles.menuItemIcon}>
            <Icon name="gavel" size={26} />
          </View>
          <Text style={styles.menuItemText}>Impressum</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

DrawerMenuView.propTypes = {
  // From mapDispatchToProps:
  drawerOpenStateChanged: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({

});

function mapDispatchToProps(dispatch) {
  return {
    drawerOpenStateChanged: bindActionCreators(drawerOpenStateChanged, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenuView);
