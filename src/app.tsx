import React from 'react';
//nav
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import { StyleSheet } from 'react-native';
import { Home, Edit, Player, Help, Tnc, About } from './screens';
import { Loading } from './components';

export type RootStackParamList = {
  Home: {
    target: number;
    totalcount: number;
    mala: number;
    beadcount: number;
    elapsedtime: string;
    esttime: string;
    malatime: number;
    languageindex: number;
  };
  Edit: {
    target: number;
    totalcount: number;
    mala: number;
    beadcount: number;
    esttime: string;
    elapsedtime: string;
    malatime: number;
    languageindex: number;
  };
  Player: {
    target: number;
    totalcount: number;
    mala: number;
    beadcount: number;
    esttime: string;
    elapsedtime: string;
    malatime: number;
    languageindex: number;
  };
  Help: {
    languageindex: number;
  };
  About: {
    languageindex: number;
  };
  Tnc: {
    languageindex: number;
  };
  Loading: {
    target: number;
    totalcount: number;
    mala: number;
    beadcount: number;
    elapsedtime: string;
    esttime: string;
    malatime: number;
    languageindex: number;
  };
};
const initialRouteParams = {
  target: 100000,
  totalcount: 0,
  mala: 0,
  beadcount: 108,
  languageindex: 0,
  elapsedtime: '00:00:00',
  esttime: '00:00:00',
  malatime: 0,
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Group screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen
            name="Loading"
            component={Loading}
            initialParams={initialRouteParams}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Tnc" component={Tnc} />
          <Stack.Screen name="About" component={About} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
