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
import LoadingView from '../components/LoadingView';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene
    key="root"
    component={connect(state =>
      ({
        tripsCount: state.trips.trips.default && state.trips.trips.default.length,
        initialized: state.app.initialized,
      }))(Switch)}
    tabs
    selector={(props) => {
      if (!props.initialized) {
        return 'placeholder';
      }
      return props.tripsCount > 0 ? 'main' : 'intro';
    }}
  >
    <Scene
      key="placeholder"
      component={LoadingView}
      hideNavBar
    />
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
