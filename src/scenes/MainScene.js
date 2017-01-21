import React from 'react';
import { Navigator } from 'react-native';
import { Scene } from 'react-native-router-flux';
import HomeView from '../components/HomeView';
import TripRecordingView from '../components/TripRecordingView';
import LogEntryDetailView from '../components/LogEntryDetailView';

const navbarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

const commonNavbarProps = {
  sceneStyle: { marginTop: navbarHeight },
};

export default (
  <Scene key="main">
    <Scene
      key="home"
      component={HomeView}
      type="replace"
      title="Tachograph"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
    <Scene
      key="tripRecording"
      type="replace"
      component={TripRecordingView}
      title="Trip Recording"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
    <Scene
      key="addLogEntry"
      component={LogEntryDetailView}
      type="replace"
      title="Add Log Entry"
      sceneStyle={commonNavbarProps.sceneStyle}
    />
  </Scene>
);
