import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {APP_THEME} from './utils';
import store from './app/store';

export default function Main() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={APP_THEME}>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
