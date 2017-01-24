import React from 'react';
import { Navigator } from 'react-native';
import { Scene } from 'react-native-router-flux';
import OdometerInputView from '../components/OdometerInputView';

const navbarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

const commonNavbarProps = {
  sceneStyle: { marginTop: navbarHeight },
};

export default (
  <Scene key="intro">
    <Scene
      key="odometerInput"
      component={OdometerInputView}
      title="Einrichtung"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
  </Scene>
);
