import React from 'react';
import { Navigator } from 'react-native';
import { Scene } from 'react-native-router-flux';
import HomeView from '../components/HomeView';
import TripRecordingView from '../components/TripRecordingView';
import TripBoundsView from '../components/TripBoundsView';
import TripRouteView from '../components/TripRouteView';
import TripPurposeView from '../components/TripPurposeView';
import TripListView from '../components/TripListView';
import Drawer from '../components/Drawer';

const navbarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

const commonNavbarProps = {
  sceneStyle: { marginTop: navbarHeight },
};

export default (
  <Scene key="main">
    <Scene key="drawer" component={Drawer}>
      <Scene key="drawerTabs">
        <Scene key="tripRecordingTab">
          <Scene
            key="home"
            component={HomeView}
            title="Tachograph"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripRecording"
            component={TripRecordingView}
            title="Trip Recording"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripBounds"
            component={TripBoundsView}
            title="Trip Bounds"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripRoute"
            component={TripRouteView}
            title="Trip Route"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripPurpose"
            component={TripPurposeView}
            title="Trip Purpose"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
        </Scene>
        <Scene key="tripsTab">
          <Scene
            key="tripList"
            component={TripListView}
            title="Fahrtenbuch"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);
