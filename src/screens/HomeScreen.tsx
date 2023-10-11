import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Foot, Head } from '../components';
const Back = require('../assets/back.jpg');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const away = target / beadcount - totalcount;
  const meditime = addTime(route.params.meditime, route.params.elapsedtime);

  const handleBeginPress = () => {
    navigation.push('Player', {
      target: target,
      totalcount: totalcount,
      meditime: meditime,
      mala: mala,
      beadcount: beadcount,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.img} />
      {/* Header */}
      <Head />
      {/* Om */}
      <TouchableOpacity onPress={handleBeginPress}>
        <View style={styles.omContainer}>
          <Text style={styles.omText}>ॐ</Text>
        </View>
        <View style={styles.beginButton}>
          <Text style={{ color: 'white', fontSize: 18 }}> Begin / आरम्भ</Text>
        </View>
      </TouchableOpacity>
      {/* Previous meditation details */}
      <View style={styles.meditationDetails}>
        <Text style={{ color: 'white' }}>Meditation so far: {meditime}</Text>
        <Text style={{ color: 'white' }}>Total count: {totalcount}</Text>
        <Text style={{ color: 'white' }}>Target: {target}</Text>
        <Text style={{ color: 'white' }}>Beads count: {beadcount}</Text>
      </View>
      {/* Grey box */}
      <View style={styles.greyBox}>
        <Text style={{ color: 'white' }}>Mala Completed: {mala}</Text>
        <Text style={{ color: 'white' }}>
          You are {away} malas away from your goal
        </Text>
        <Text style={{ color: 'white' }}>Time estimation for completion</Text>
      </View>
      {/* Bottom bar */}
      <Foot navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    position: 'absolute',
    top: 0,
    height: 870,
    zIndex: 0,
  },
  omContainer: {
    marginTop: 20,
  },
  omText: {
    fontSize: 200,
  },
  beginButton: {
    marginTop: -40,
    marginBottom: 40,
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  meditationDetails: {
    marginTop: 20,
    backgroundColor: '#DC5F00',
    padding: 20,
    borderRadius: 10,
    width: 300,
    marginHorizontal: 0,
  },
  greyBox: {
    marginTop: 20,
    backgroundColor: '#DC5F00',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
});

const addTime = (time1: string = '00:00:00', time2: string = '00:00:00') => {
  const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
  const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

  let totalSeconds = seconds1 + seconds2;
  let totalMinutes = minutes1 + minutes2;
  let totalHours = hours1 + hours2;

  if (totalSeconds >= 60) {
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
  }

  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  }

  return `${totalHours.toString().padStart(2, '0')}:${totalMinutes
    .toString()
    .padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
};

export default HomeScreen;
