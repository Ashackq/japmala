/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  PanResponder,
  BackHandler,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Head, Sound } from '../components';
const Bead = require('../assets/bead.jpg');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Player'>;
const PrayerScreen = ({ navigation, route }: HomeProps) => {
  const [prayerCount, setPrayerCount] = useState(route.params.totalcount);
  const [hasDragged, setHasDragged] = useState(false);
  const startTimeRef = useRef(new Date());
  const countertimeref = useRef(new Date());

  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const [mala, setMala] = useState(route.params.mala);
  const meditime = route.params.meditime;
  const [esttime, setesttime] = useState('00:00:00');

  const imagePosition = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedtime = calculateElapsedTime();
      setElapsedTime(elapsedtime);
    }, 1000);
    navigation.setParams({ meditime: elapsedTime });
    return () => clearInterval(interval);
  }, [calculateElapsedTime, elapsedTime, navigation]);

  useEffect(() => {
    if (prayerCount === beadcount) {
      setMala((prevMala) => prevMala + 1);
      setPrayerCount(0);
      const endTime = new Date();
      const elapsedMilliseconds = endTime - countertimeref.current;
      let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

      // Calculate the time for one mala from 0 mala count
      let timeForOneMalaSeconds = elapsedSeconds;

      // Calculate the time for one mala in the format HH:mm:ss
      let timeForOneMala = formatTime(timeForOneMalaSeconds);
      console.log('Time for One Mala:', timeForOneMala);

      setesttime(timeForOneMala);
      countertimeref.current = new Date();
    }
  }, [prayerCount, beadcount, mala, setesttime]);
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
          esttime: esttime,
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
    esttime,
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

        if (isInsideImage && gestureState.dy < 0) {
          setPrayerCount((prevCount) => prevCount + 1);
          setHasDragged(true);

          const animations = [];
          const beadCount = 5; // Number of beads in the image
          const stagger = 100; // Stagger time between animations

          for (let i = 0; i < beadCount; i++) {
            // Stagger the animations for a chain-like effect
            animations.push(
              Animated.timing(imagePosition, {
                toValue: { x: 0, y: gestureState.dy - 200 - i * 20 },
                duration: 200,
                useNativeDriver: true,
              })
            );
          }

          Animated.sequence(animations).start(() => {
            // Reset image position when animation sequence completes
            imagePosition.setValue({ x: 0, y: 0 });
          });
        }
      }
    },

    onPanResponderRelease: () => {
      setHasDragged(false);

      // Reset image position
      Animated.spring(imagePosition, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          alignItems: 'center',
          transform: imagePosition.getTranslateTransform(),
        }}
      >
        <View>
          <Image source={Bead} style={styles.img} />
        </View>
      </Animated.View>
      <View style={styles.head}>
        <Head />
      </View>
      <View style={styles.greybox}>
        <Text style={{ color: 'white', backgroundColor: 'grey', fontSize: 20 }}>
          Prayer Count: {prayerCount}
        </Text>
        <Text style={styles.grey2}>Elapsed Time: {elapsedTime}</Text>
      </View>
      <View style={{ position: 'absolute', top: 0 }}>
        <Sound />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greybox: {
    alignItems: 'center',
    marginTop: 20,
    bottom: 0,
    padding: 50,
    right: 0,
    left: 0,
    backgroundColor: 'grey',
    position: 'absolute',
  },
  grey2: {
    color: 'white',
    backgroundColor: 'grey',
    fontSize: 20,
    marginTop: 10,
  },
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 500,
  },
  img: {
    height: 1000,
    width: 140,
    position: 'absolute',
    zIndex: 2,
    top: -100,
    left: -75,
    right: 0,
  },
});
export default PrayerScreen;
