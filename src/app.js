import React from 'react';
import { UIManager } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import scenes from './scenes';
import './i18n';

UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        {scenes}
      </Provider>
    );
  }
}
