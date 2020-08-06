import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './features/home/Home';
import SampleDetails from './features/samples/SampleDetails';
import {APP_THEME} from './utils';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const screenOptions = {
    headerStyle: {
      backgroundColor: APP_THEME.colors.accent,
    },
    headerTintColor: APP_THEME.colors.background,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={SampleDetails} />
        {/* <Stack.Screen name="Camera" component={Camera} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
