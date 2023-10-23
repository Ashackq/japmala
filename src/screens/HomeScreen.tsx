import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Head } from '../components';
const Om = require('../devdata/assets/om.png');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const i = route.params.languageindex;
  const malatime = route.params.malatime;
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        // Load the progress data from AsyncStorage
        const storedProgress = await AsyncStorage.getItem('progress');
        if (storedProgress) {
          const progressData = JSON.parse(storedProgress);
          navigation.setParams({
            totalcount: progressData.totalcount,
            beadcount: progressData.beadcount,
            target: progressData.target,
            mala: progressData.mala,
            esttime: progressData.esttime,
            elapsedtime: progressData.elapsedtime,
            languageindex: progressData.languageindex,
            malatime: progressData.malatime,
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
  const calculateEstimatedTotalTime = () => {
    const [estHours, estMinutes, estSeconds] = esttime.split(':').map(Number);
    const totalEstSeconds = estHours * 3600 + estMinutes * 60 + estSeconds;
    const estimatedTotalSeconds = totalEstSeconds * (target / beadcount - mala);
    return formatTime(Math.ceil(estimatedTotalSeconds));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const estimatedTotalTime = calculateEstimatedTotalTime();
  const handleBeginPress = () => {
    navigation.push('Player', {
      target: target,
      totalcount: totalcount,
      mala: mala,
      beadcount: beadcount,
      esttime: esttime,
      elapsedtime: elapsedtime,
      languageindex: i,
      malatime: malatime,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Head name={lang[i].Moksha} navigation={navigation} route={route} />
      </View>
      <TouchableOpacity
        onPress={handleBeginPress}
        activeOpacity={1}
        style={styles.img}
      />
      <View style={styles.omContainer}>
        <View style={styles.greyBox}>
          <Text style={styles.text}>
            {lang[i].meditaionsofar}: {elapsedtime}
          </Text>
          <Text style={styles.text}>
            {lang[i].totalcount}: {totalcount + mala * beadcount}
          </Text>
          <Text style={styles.text}>
            {lang[i].target}: {target}
          </Text>
          <Text style={styles.text}>
            {lang[i].beadcont}: {beadcount}
          </Text>
        </View>

        <View style={styles.greyBox}>
          <Text style={styles.text}>
            {lang[i].malascomp}: {mala}
          </Text>
          <Text style={styles.text}>
            {lang[i].youare} {Math.ceil(target / beadcount - mala)}{' '}
            {lang[i].goalaway}
          </Text>
          {esttime === '00:00:00' ? (
            <Text style={styles.text}>{lang[i].cannot}</Text>
          ) : (
            <Text style={styles.text}>
              {lang[i].timeforcomp} {estimatedTotalTime}
            </Text>
          )}
        </View>
      </View>
      <Image source={Om} style={styles.img2} />
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
  greyBox: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.8,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 900,
  },
  img2: {
    position: 'absolute',
    top: -10,
  },
  omContainer: {
    position: 'absolute',
    bottom: -10,
    zIndex: 1,
  },

  meditationDetails: {
    marginTop: 20,
    backgroundColor: '#d66c23',
    padding: 10,
    borderRadius: 10,
    width: 280,
    marginHorizontal: 0,
  },

  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
});

export default HomeScreen;
