/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, PanResponder, BackHandler } from 'react-native';
const Bead = require('../assets/bead.gif');
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Gif from 'react-native-gif';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Player'>;
const PrayerScreen = ({ navigation, route }: HomeProps) => {
  const [prayerCount, setPrayerCount] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const startTimeRef = useRef(new Date());
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const meditime = route.params.meditime;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedtime = calculateElapsedTime();
      setElapsedTime(elapsedtime);
    }, 1000);
    navigation.setParams({ meditime: elapsedTime });
    return () => clearInterval(interval);
  }, [calculateElapsedTime, elapsedTime, navigation]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const elapsedFormatted = calculateElapsedTime();
        navigation.replace('Home', {
          meditime: meditime,
          totalcount: prayerCount,
          mala: mala,
          beadcount: beadcount,
          target: target,
          elapsedtime: elapsedFormatted,
        });
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [
    navigation,
    calculateElapsedTime,
    prayerCount,
    beadcount,
    mala,
    target,
    meditime,
  ]);
  useEffect(() => {
    console.log('meditime param - ', route.params.meditime);
  }, [route.params.meditime]);

  const calculateElapsedTime = () => {
    const endTime = new Date();
    const elapsedMilliseconds = endTime - startTimeRef.current;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return formatTime(elapsedSeconds);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (!hasDragged) {
        const isInsideImage =
          gestureState.moveX > 0 &&
          gestureState.moveX < 400 &&
          gestureState.moveY > 0 &&
          gestureState.moveY < 500;

        if (isInsideImage) {
          setPrayerCount((prevCount) => prevCount + 1);
          setHasDragged(true);
        }
      }
    },
    onPanResponderRelease: () => {
      setHasDragged(false);
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View {...panResponder.panHandlers} style={{ alignItems: 'center' }}>
        <Gif source={Bead} style={{ width: 400, height: 700 }} />
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
          bottom: 0,
          padding: 50,
          right: 0,
          left: 0,
          backgroundColor: 'grey',
          position: 'absolute',
        }}
      >
        <Text style={{ color: 'white', backgroundColor: 'grey', fontSize: 20 }}>
          Prayer Count: {prayerCount}
        </Text>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'grey',
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Elapsed Time: {elapsedTime}
        </Text>
      </View>
    </View>
  );
};

export default PrayerScreen;
