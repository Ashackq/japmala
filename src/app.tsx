import React from 'react';
//nav
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import { StyleSheet } from 'react-native';
import { Home, Edit, Player, Help } from './screens';
import { Loading } from './components';

export type RootStackParamList = {
  Home: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
    elapsedtime: string;
    esttime: string;
    malatime: string;
    displaytime: string;
    languageindex: number;
  };
  Edit: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
    esttime: string;
    elapsedtime: string;
    malatime: string;
    displaytime: string;
    languageindex: number;
  };
  Player: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
    esttime: string;
    elapsedtime: string;
    malatime: string;
    displaytime: string;
    languageindex: number;
  };
  Help: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
    esttime: string;
    elapsedtime: string;
    malatime: string;
    displaytime: string;
    languageindex: number;
  };
  Loading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Group screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{
              target: 100000,
              beadcount: 108,
              mala: 0,
              totalcount: 0,
              meditime: '00:00:00',
              esttime: '00:00:00',
              displaytime: '00:00:00',
              malatime: '00:00:00',
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            initialParams={{
              target: 100000,
              beadcount: 108,
              meditime: '00:00:00',
              esttime: '00:00:00',
            }}
          />
          <Stack.Screen
            name="Player"
            component={Player}
            initialParams={{
              target: 100000,
              beadcount: 108,
              mala: 0,
              totalcount: 0,
              meditime: '00:00:00',
              esttime: '00:00:00',
            }}
          />
          <Stack.Screen
            name="Help"
            component={Help}
            initialParams={{
              target: 100000,
              beadcount: 108,
              mala: 0,
              totalcount: 0,
              meditime: '00:00:00',
              esttime: '00:00:00',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
