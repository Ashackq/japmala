import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Langsel } from '.';
import { lang } from '../devdata/constants/languages';
const Editback = require('../devdata/assets/editback.jpg');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const [i, setSelectedLanguageIndex] = useState(route.params.languageindex);
  const handleLanguageChange = (value: number) => {
    setSelectedLanguageIndex(value);
  };
  const malatime = route.params.malatime;
  const [langtrue, setLangTrue] = useState(0);
  const updateLangTrue = async (newLangTrueValue: number) => {
    try {
      const storedProgress = await AsyncStorage.getItem('progress');
      if (storedProgress) {
        const progressData = JSON.parse(storedProgress);
        progressData.langtrue = newLangTrueValue;
        await AsyncStorage.setItem('progress', JSON.stringify(progressData));
      } else {
        console.error('Progress data not found.');
      }
    } catch (error) {
      console.error('Error updating langtrue:', error);
    }
  };
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
        const storedProgress = await AsyncStorage.getItem('progress');
        if (storedProgress) {
          const progressData = JSON.parse(storedProgress);
          setLangTrue(progressData.langtrue);
          if (langtrue === 1) {
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
          }
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
            langtrue: 0,
          });
          loadProgressData();
        }
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    };

    loadProgressData();
  }, [navigation, langtrue]);

  return (
    <View style={styles.container}>
      <Image source={Editback} style={styles.img2} />
      {langtrue === 1 ? (
        <Text style={styles.appby}>A Product of ABCOM</Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.appby1}>{lang[i].selectlanguage}</Text>
          <View style={styles.appby2}>
            <Langsel
              selectedindex={i}
              setSelectedindex={handleLanguageChange}
              navigation={navigation}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              updateLangTrue(1);
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, marginTop: -50 }}>
              {lang[i].set}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img2: {
    position: 'absolute',
    top: 0,
    height: 900,
  },
  appby: {
    position: 'absolute',
    top: 220,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  appby1: {
    position: 'absolute',
    top: 320,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  appby2: {
    position: 'absolute',
    top: 350,
    backgroundColor: 'white',
  },
});

export default LoadingScreen;
