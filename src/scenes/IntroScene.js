import React from 'react';
import { Navigator } from 'react-native';
import { Scene, Switch } from 'react-native-router-flux';
import { connect } from 'react-redux';
import OdometerInputView from '../components/OdometerInputView';
import CarDetailView from '../components/CarDetailView';

const navbarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

const commonNavbarProps = {
  sceneStyle: { marginTop: navbarHeight },
};

export default (
  <Scene
    key="intro"
    component={connect(state =>
      ({
        carCount: state.cars.cars.length,
      }))(Switch)}
    tabs
    selector={(props) => {
      return props.carCount > 0 ? 'odometerInput' : 'addCar';
    }}
    type="replace"
  >
    <Scene
      key="addCar"
      component={CarDetailView}
      title="Fahrzeug hinzufügen"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
    <Scene
      key="odometerInput"
      component={OdometerInputView}
      title="Einrichtung"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
  </Scene>
);
