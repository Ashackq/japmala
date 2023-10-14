import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Foot, Head } from '../components';
const Back = require('../devdata/assets/back.jpg');
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const meditime = addTime(route.params.meditime, route.params.elapsedtime);
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const i = route.params.languageindex;
  console.log('i - ', i);
  const handleBeginPress = () => {
    navigation.push('Player', {
      target: target,
      totalcount: totalcount,
      meditime: meditime,
      mala: mala,
      beadcount: beadcount,
      esttime: esttime,
      elapsedtime: elapsedtime,
      languageindex: i,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={Back} style={styles.img} />
      {/* Header */}
      <Head ishome={true} name={lang[i].Moksha} route={route} />
      {/* Om */}
      <TouchableOpacity onPress={handleBeginPress} style={styles.ooom}>
        <View style={styles.omContainer}>
          <Text style={styles.omText}>ॐ</Text>
        </View>
        <View style={styles.beginButton}>
          <Text style={{ color: 'white', fontSize: 18 }}>{lang[i].begin}</Text>
        </View>
      </TouchableOpacity>

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
  ooom: {
    position: 'absolute',
    top: 160,
  },
  img: {
    position: 'absolute',
    top: 0,
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
    backgroundColor: '#d66c23',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  meditationDetails: {
    marginTop: 20,
    backgroundColor: '#d66c23',
    padding: 10,
    borderRadius: 10,
    width: 280,
    marginHorizontal: 0,
  },
  greyBox: {
    backgroundColor: '#d66c23',
    padding: 10,
    borderRadius: 10,
    width: 280,
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
