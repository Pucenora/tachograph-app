import React from 'react';
import { Navigator } from 'react-native';
import { Scene } from 'react-native-router-flux';
import HomeView from '../components/HomeView';

const navbarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

const commonNavbarProps = {
  sceneStyle: { marginTop: navbarHeight },
};

export default (
  <Scene key="main">
    <Scene
      key="home"
      component={HomeView}
      title="Tachograph"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
  </Scene>
);
