import React from 'react';
import {
  Router,
  Actions,
  Scene,
  Switch,
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import MainScene from './MainScene';
import IntroScene from './IntroScene';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene
    key="root"
    component={connect(state =>
      ({ initialOdometerReading: state.odometer.initialOdometerReading }))(Switch)}
    tabs
    selector={props => (props.initialOdometerReading ? 'main' : 'intro')}
  >
    {IntroScene}
    {MainScene}
  </Scene>,
);

export default (
  <RouterWithRedux
    scenes={scenes}
    titleStyle={{ fontWeight: 'bold' }}
    onExitApp={() => true}
  />
);
