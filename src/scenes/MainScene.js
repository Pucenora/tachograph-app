import React from 'react';
import { Navigator } from 'react-native';
import { Scene } from 'react-native-router-flux';
import HomeView from '../components/HomeView';
import TripRecordingView from '../components/TripRecordingView';
import TripDetailView from '../components/TripDetailView';
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
            type="replace"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripRecording"
            component={TripRecordingView}
            title="Trip Recording"
            type="replace"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripDetail"
            component={TripDetailView}
            title="Add Trip"
            type="replace"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
        </Scene>
        <Scene key="tripsTab">
          <Scene
            key="tripList"
            component={TripListView}
            title="Fahrtenbuch"
            type="replace"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);
