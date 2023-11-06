/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  BackHandler,
  StyleSheet as Query,
  Image,
  Animated,
  Vibration,
  Modal,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { lang } from '../devdata/constants/languages';
import Sound from 'react-native-sound';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ads, Head } from '../components';
import StyleSheet from 'react-native-media-query';

const Bead = require('../devdata/assets/bead.jpg');
const Pause = require('../devdata/assets/pause.png');
const Play = require('../devdata/assets/play.png');
const HomeBack = require('../devdata/assets/pray.jpg');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Player'>;
const PrayerScreen = ({ navigation, route }: HomeProps) => {
  const [prayerCount, setPrayerCount] = useState(route.params?.totalcount || 0);
  const [hasDragged] = useState(false);
  const startTimeRef = useRef(new Date());
  const countertimeref = useRef(new Date());
  const pauseTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [prevelapsed] = useState(route.params.elapsedtime);
  const prevmalatime = route.params.malatime;
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const [mala, setMala] = useState(route.params.mala || 0);
  const esttime = route.params.esttime;
  const i = route.params.languageindex;
  const [timeForOneMala, setTimemala] = useState(0);
  const imagePosition = useRef(new Animated.ValueXY()).current;
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  const storeProgressData = async (data) => {
    try {
      await AsyncStorage.setItem('progress', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress data:', error);
    }
  };

  const [sound] = useState(
    new Sound('maladone.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
      }
    })
  );

  const handlePauseResume = () => {
    if (isTimerRunning) {
      storeProgressData({
        target: target,
        totalcount: prayerCount,
        mala: mala,
        beadcount: beadcount,
        esttime: esttime,
        elapsedtime: elapsedTime,
        languageindex: i,
        malatime: timeForOneMala,
      });
      pauseTimeRef.current = new Date().getTime();
      clearInterval(intervalRef.current!);
    } else {
      if (pauseTimeRef.current !== null) {
        const currentTime = new Date().getTime();
        const pausedDuration = currentTime - pauseTimeRef.current;

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

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      const elapsedtime = calculateElapsedTime();
      setElapsedTime(elapsedtime);
    }, 1000);
  };

  const calculateElapsedTime = () => {
    let endTime = new Date();

    if (pauseTimeRef.current !== null) {
      // Adjust end time when the timer is paused
      endTime = new Date(
        endTime.getTime() - (endTime.getTime() - pauseTimeRef.current)
      );
    }
    let elapsedMilliseconds = endTime - startTimeRef.current;
    if (prevelapsed && prevelapsed !== '00:00:00') {
      const prevelapsedParts = prevelapsed.split(':');
      const prevelapsedHours = parseInt(prevelapsedParts[0], 10);
      const prevelapsedMinutes = parseInt(prevelapsedParts[1], 10);
      const prevelapsedSeconds = parseInt(prevelapsedParts[2], 10);

      // Add the parsed hours, minutes, and seconds to the elapsed time
      elapsedMilliseconds +=
        prevelapsedHours * 3600000 +
        prevelapsedMinutes * 60000 +
        prevelapsedSeconds * 1000;
    }
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return formatTime(elapsedSeconds);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsedtime = calculateElapsedTime();
      setElapsedTime(elapsedtime);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [calculateElapsedTime, elapsedTime]);

  useEffect(() => {
    if (prayerCount === beadcount) {
      sound.play((success) => {
        if (!success) {
          console.log('Failed to play the beep sound');
        }
      });
      setMala((prevMala) => prevMala + 1);
      setPrayerCount(0);

      navigation.setParams({ malatime: 0 });
      navigation.setParams({ esttime: formatTime(timeForOneMala) });
      storeProgressData({
        target: target,
        totalcount: prayerCount,
        mala: mala,
        beadcount: beadcount,
        esttime: esttime,
        elapsedtime: elapsedTime,
        languageindex: i,
        malatime: timeForOneMala,
      });

      countertimeref.current = new Date();
    } else {
      const endTime = new Date();
      const elapsedMilliseconds = endTime - countertimeref.current;
      let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

      if (prevmalatime === 0) {
        setTimemala(elapsedSeconds);
      } else {
        const totalSeconds = prevmalatime + elapsedSeconds;

        setTimemala(totalSeconds);
      }
    }
  }, [
    beadcount,
    elapsedTime,
    esttime,
    i,
    mala,
    navigation,
    prayerCount,
    prevmalatime,
    sound,
    target,
    timeForOneMala,
  ]);

  useEffect(() => {
    if (prayerCount + mala * beadcount === target) {
      setShowResetModal(true);
      setMala(0);
      setPrayerCount(0);
    }
  }, [beadcount, mala, prayerCount, target]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const elapsedFormatted = calculateElapsedTime();
        storeProgressData({
          target: target,
          totalcount: prayerCount,
          mala: mala,
          beadcount: beadcount,
          esttime: esttime,
          elapsedtime: elapsedFormatted,
          languageindex: i,
          malatime: timeForOneMala,
        });
        navigation.replace('Home', {
          totalcount: prayerCount,
          mala: mala,
          beadcount: beadcount,
          target: target,
          elapsedtime: elapsedFormatted,
          esttime: esttime,
          malatime: timeForOneMala,
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
    esttime,
    calculateElapsedTime,
    i,
    timeForOneMala,
  ]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleImagePress = () => {
    if (isTimerRunning) {
      storeProgressData({
        target: target,
        totalcount: prayerCount,
        mala: mala,
        beadcount: beadcount,
        esttime: esttime,
        elapsedtime: elapsedTime,
        languageindex: i,
        malatime: timeForOneMala,
      });
      if (!hasDragged) {
        setPrayerCount((prevCount) => prevCount + 1);
        const animations = [];
        animations.push(
          Animated.timing(imagePosition, {
            toValue: { x: 0, y: -270 },
            duration: 1000,
            useNativeDriver: true,
          })
        );

        Animated.sequence(animations).start(() => {
          imagePosition.setValue({ x: 0, y: 0 });
        });
      }
      Vibration.vibrate(500);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0b78ee' }}>
      <Image source={HomeBack} style={styles.img3} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleImagePress}
        style={styles.overlay}
      />
      <TouchableWithoutFeedback>
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

      {/* Ads */}
      <View style={styles.container}>
        <Ads />
      </View>
      <View style={styles.head}>
        <Head name={lang[i].Moksha} navigation={navigation} route={route} />
      </View>
      <View style={styles.countcont}>
        <Text style={styles.prayercount}>
          {mala} - {prayerCount}
        </Text>
      </View>
      <View style={styles.greybox}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {lang[i].elapsed}: {elapsedTime}
          </Text>
        </View>

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
      <Modal visible={showResetModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.warningLabel}>{lang[i].warning1}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowResetModal(false);
              }}
              style={styles.resetButton1}
            >
              <Text style={styles.buttonLabel}>{lang[i].Ok}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { styles } = StyleSheet.create({
  container: {
    top: 70,
  },
  greybox: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 5,
    right: 0,
    left: 0,
    backgroundColor: 'grey',
  },
  img3: {
    position: 'absolute',
    top: 0,
    height: 900,
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
    height: 1050,
    width: 150,
    position: 'absolute',
    zIndex: 2,
    left: -80,
    right: 0,
    '@media (min-height: 1920px)': {
      height: 850,
      width: 100,
    },
    '@media (max-height: 760px)': {
      height: 850,
      width: 120,
      left: -60,
      top: 80,
    },
  },

  timerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontSize: 20,
  },
  pauseButton: {
    marginLeft: 10,
  },
  img2: {
    height: 45,
    width: 45,
    '@media (min-height: 1920px)': {
      height: 35,
      width: 35,
    },
  },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  prayercount: {
    color: 'white',
    fontSize: 70,
    lineHeight: 70,
    position: 'absolute',
    marginTop: '70%',
  },
  countcont: {
    alignItems: 'center',
  },
  overlay: {
    ...Query.absoluteFillObject,
    top: 150,
    zIndex: 1,
    marginLeft: '8%',
    width: 340,
    marginBottom: 110,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    opacity: 0.9,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
  },
  buttonLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  resetButton1: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  warningLabel: {
    fontSize: 22,
    color: 'red',
  },
});

export default PrayerScreen;
