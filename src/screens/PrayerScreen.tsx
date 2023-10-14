/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { lang } from '../devdata/constants/languages';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Head, Sound } from '../components';
const Bead = require('../devdata/assets/bead.jpg');
const Pause = require('../devdata/assets/pause.png');
const Play = require('../devdata/assets/play.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Player'>;
const PrayerScreen = ({ navigation, route }: HomeProps) => {
  const [prayerCount, setPrayerCount] = useState(route.params.totalcount);
  const [hasDragged, setHasDragged] = useState(false);
  const startTimeRef = useRef(new Date());
  const countertimeref = useRef(new Date());
  const pauseTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const [mala, setMala] = useState(route.params.mala);
  const meditime = route.params.meditime;
  const [esttime, setesttime] = useState('00:00:00');
  const i = route.params.languageindex;

  const imagePosition = useRef(new Animated.ValueXY()).current;
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handlePauseResume = () => {
    console.log('Play/Pause button pressed');
    console.log('Current isTimerRunning value:', isTimerRunning);

    if (isTimerRunning) {
      // Pause the timer
      console.log('Pausing timer...');
      pauseTimeRef.current = new Date().getTime();
      clearInterval(intervalRef.current!);
    } else {
      // Resume the timer
      console.log('Resuming timer...');
      if (pauseTimeRef.current !== null) {
        const currentTime = new Date().getTime();
        const pausedDuration = currentTime - pauseTimeRef.current;

        // Adjust the start time to consider the pause duration
        const adjustedStartTime = new Date(startTimeRef.current);
        adjustedStartTime.setSeconds(
          adjustedStartTime.getSeconds() + pausedDuration / 1000
        );
        startTimeRef.current = adjustedStartTime;
      }
      pauseTimeRef.current = null;
      startTimer();
    }

    setIsTimerRunning((prev) => !prev);
  };

  useEffect(() => {
    startTimer();
    navigation.setParams({ elapsedtime: elapsedTime });

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [elapsedTime, navigation, startTimer]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      const elapsedtime = calculateElapsedTime();
      setElapsedTime(elapsedtime);
    }, 1000);
  };

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
          languageindex: i,
        });
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [
    navigation,
    prayerCount,
    beadcount,
    mala,
    target,
    meditime,
    esttime,
    calculateElapsedTime,
    i,
  ]);

  useEffect(() => {
    console.log('meditime param - ', elapsedTime);
  }, [elapsedTime]);

  const calculateElapsedTime = () => {
    let endTime = new Date();

    if (pauseTimeRef.current !== null) {
      // Adjust end time when the timer is paused
      endTime = new Date(
        endTime.getTime() - (endTime.getTime() - pauseTimeRef.current)
      );
    }

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

  const handleImagePress = () => {
    if (!hasDragged) {
      setPrayerCount((prevCount) => prevCount + 1);

      const animations = [];
      const beadCount = 5;

      for (let i = 0; i < beadCount; i++) {
        animations.push(
          Animated.timing(imagePosition, {
            toValue: { x: 0, y: -200 },
            duration: 200,
            useNativeDriver: true,
          })
        );
      }

      Animated.sequence(animations).start(() => {
        imagePosition.setValue({ x: 0, y: 56 });
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TouchableWithoutFeedback onPress={handleImagePress}>
        <Animated.View
          style={{
            alignItems: 'center',
            transform: imagePosition.getTranslateTransform(),
          }}
        >
          <View>
            <Image source={Bead} style={styles.img} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <View style={styles.head}>
        <Head ishome={false} name={lang[i].Moksha} route={route} />
      </View>
      <Text style={styles.prayercount}>
        {mala} - {prayerCount}
      </Text>
      <View style={styles.greybox}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {lang[i].elapsed}: {elapsedTime}
          </Text>
          <TouchableOpacity
            onPress={handlePauseResume}
            style={styles.pauseButton}
          >
            {isTimerRunning ? (
              <Image source={Pause} style={styles.img2} />
            ) : (
              <Image source={Play} style={styles.img2} />
            )}
          </TouchableOpacity>
        </View>
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
    top: -50,
    left: -75,
    right: 0,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  timerText: {
    color: 'white',
    fontSize: 20,
  },
  pauseButton: {
    marginLeft: 10,
  },
  img2: { height: 25, width: 25 },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  prayercount: {
    color: 'white',
    fontSize: 100,
    position: 'absolute',
    marginTop: '70%',
    marginLeft: '25%',
  },
});
export default PrayerScreen;
