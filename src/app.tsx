/* eslint-disable prettier/prettier */
import React from 'react';
//nav
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import { StyleSheet } from 'react-native';
import { Home, Edit, Player } from './screens';

export type RootStackParamList = {
  Home: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
    elapsedtime: string;
  };
  Edit: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
  };
  Player: {
    target: number;
    totalcount: number;
    meditime: string;
    mala: number;
    beadcount: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Group screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{
              target: 100000,
              beadcount: 108,
              mala: 0,
              totalcount: 0,
              meditime: '00:00:00',
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            initialParams={{
              target: 100000,
              beadcount: 108,
              meditime: '00:00:00',
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
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
