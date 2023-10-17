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
  const meditime = addTime(route.params.meditime, route.params.displaytime);
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const i = route.params.languageindex;
  const malatime = route.params.malatime;
  const displaytime = route.params.displaytime;
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
      malatime: malatime,
      displaytime: displaytime,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleBeginPress}
        style={styles.img}
        activeOpacity={1}
      >
        <Image source={Back} />
      </TouchableOpacity>
      <Head ishome={true} name={lang[i].Moksha} route={route} />

      <View style={styles.omContainer}>
        <Text style={styles.omText}>ॐ</Text>
      </View>

      {/* Bottom bar */}
      <Foot
        navigation={navigation}
        route={route}
        i={i}
        target={target}
        beadcount={beadcount}
        esttime={esttime}
        elapsedtiem="00:00:00"
        mala={mala}
        meditime={meditime}
        totalcount={totalcount}
      />
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
    zIndex: 0,
  },
  omContainer: {
    position: 'absolute',
    top: 160,
  },
  omText: {
    fontSize: 200,
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
