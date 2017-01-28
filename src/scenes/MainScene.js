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
      <Scene key="drawerTabs" tabs>
        <Scene key="newTripTab">
          <Scene
            key="home"
            component={HomeView}
            title="Tachograph"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripRecording"
            component={TripRecordingView}
            title="Fahrtaufzeichnung"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripBounds"
            component={TripBoundsView}
            title="Fahrt hinzufügen"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripRoute"
            component={TripRouteView}
            title="Fahrtstrecke"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripPurpose"
            component={TripPurposeView}
            title="Reisezweck"
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
          <Scene
            key="tripEditBounds"
            component={TripBoundsView}
            title="Fahrt bearbeiten"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripEditRoute"
            component={TripRouteView}
            title="Fahrtstrecke bearbeiten"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
          <Scene
            key="tripEditPurpose"
            component={TripPurposeView}
            title="Reisezweck bearbeiten"
            sceneStyle={commonNavbarProps.sceneStyle}
          />
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);
