import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Head } from '../components';
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
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const i = route.params.languageindex;
  const malatime = route.params.malatime;

  console.log('TImes - ', '\n', malatime, '\n', esttime, '\n', elapsedtime);

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
        <Head
          ishome={true}
          name={lang[i].Moksha}
          navigation={navigation}
          route={route}
        />
      </View>
      <TouchableOpacity onPress={handleBeginPress} activeOpacity={1}>
        <Image source={Back} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleBeginPress}
        activeOpacity={1}
        style={styles.omContainer}
      >
        <View>
          <Text style={styles.omText}>ॐ</Text>
        </View>
      </TouchableOpacity>
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
    top: 20,
  },
  omContainer: {
    position: 'absolute',
    top: 160,
    zIndex: 1,
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
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
});

export default HomeScreen;
