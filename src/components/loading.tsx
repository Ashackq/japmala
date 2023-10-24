import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
const Om = require('../devdata/assets/om.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const i = route.params.languageindex;
  const malatime = route.params.malatime;

  const storeProgressData = async (data) => {
    try {
      await AsyncStorage.setItem('progress', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress data:', error);
    }
  };
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        // Load the progress data from AsyncStorage
        const storedProgress = await AsyncStorage.getItem('progress');
        if (storedProgress) {
          const progressData = JSON.parse(storedProgress);

          // Navigate to the Home screen with the loaded data
          setTimeout(() => {
            navigation.replace('Home', {
              totalcount: progressData.totalcount,
              beadcount: progressData.beadcount,
              target: progressData.target,
              mala: progressData.mala,
              esttime: progressData.esttime,
              elapsedtime: progressData.elapsedtime,
              languageindex: progressData.languageindex,
              malatime: progressData.malatime,
            });
          }, 2000);
        } else {
          storeProgressData({
            target: target,
            totalcount: totalcount,
            mala: mala,
            beadcount: beadcount,
            esttime: esttime,
            elapsedtime: elapsedtime,
            languageindex: i,
            malatime: malatime,
          });
          loadProgressData();
        }
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    };

    // Call the function to load progress data
    loadProgressData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Om} style={styles.img2} />

      <Text style={styles.appby}>A Product of ABCOM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b78ee',
  },
  img2: {
    position: 'absolute',
    top: -10,
  },
  appby: {
    position: 'absolute',
    top: 120,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
});

export default LoadingScreen;
