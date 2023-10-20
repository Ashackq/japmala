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
  // Vibration,
  TouchableOpacity,
} from 'react-native';
import { lang } from '../devdata/constants/languages';
import Sound from 'react-native-sound';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ads, Head } from '../components';
const Bead = require('../devdata/assets/bead.jpg');
const Pause = require('../devdata/assets/pause.png');
const Play = require('../devdata/assets/play.png');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Player'>;
const PrayerScreen = ({ navigation, route }: HomeProps) => {
  const [prayerCount, setPrayerCount] = useState(route.params?.totalcount || 0);
  const [hasDragged] = useState(false);
  const startTimeRef = useRef(new Date());
  const countertimeref = useRef(new Date());
  const pauseTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [prevelapsed] = useState(route.params.elapsedtime);
  const [prevmala] = useState(route.params.malatime);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const [mala, setMala] = useState(route.params.mala || 0);
  const esttime = route.params.esttime;
  const i = route.params.languageindex;
  const timeForOneMala = route.params.malatime;
  const imagePosition = useRef(new Animated.ValueXY()).current;
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  console.log(
    'TImes e- ',
    '\n',
    timeForOneMala,
    '\n',
    esttime,
    '\n',
    elapsedTime
  );

  const [sound] = useState(
    new Sound('maladone.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
      }
    })
  );
  useEffect(() => {
    return () => {
      sound.release();
    };
  }, [sound]);

  const handlePauseResume = () => {
    if (isTimerRunning) {
      console.log('Pausing timer...');
      pauseTimeRef.current = new Date().getTime();
      clearInterval(intervalRef.current!);
    } else {
      console.log('Resuming timer...');
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
      const displaytime = calculatedisplayElapsedTime();
      setElapsedTime(elapsedtime);
      setdisplayTime(displaytime);
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
      elapsedMilliseconds += parseInt(prevelapsed.split(':')[2]) * 1000;
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
      setMala((prevMala) => prevMala + 1);

      sound.play((success) => {
        if (!success) {
          console.log('Failed to play the beep sound');
        }
      });
      setPrayerCount(0);
      console.log('Time for One Mala:', timeForOneMala);
      navigation.setParams({ esttime: timeForOneMala });
      countertimeref.current = new Date();
      navigation.setParams({ malatime: '00:00:00' });
    } else {
      if (prevmala && prevmala !== '00:00:00') {
        const endTime = new Date();
        const elapsedMilliseconds = endTime - countertimeref.current;
        let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        let timeForOneMalaSeconds = elapsedSeconds;
        navigation.setParams({ malatime: formatTime(timeForOneMalaSeconds) });
      } else {
        const endTime = new Date();
        const elapsedMilliseconds = endTime - countertimeref.current;
        let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        // Parse the existing prevmala time to extract seconds
        const prevmalaSeconds = parseInt(prevmala.split(':')[2], 10);

        // Add the calculated seconds to the existing prevmala seconds
        elapsedSeconds += prevmalaSeconds * 1000;

        // Convert the total seconds back to the time format
        const totalSeconds = addTime(
          formatTime(elapsedSeconds) + timeForOneMala
        );
        navigation.setParams({ malatime: totalSeconds });
      }

      console.log('secnd  - ', timeForOneMala);
    }
  }, [
    prayerCount,
    beadcount,
    mala,
    timeForOneMala,
    sound,
    navigation,
    prevmala,
  ]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const elapsedFormatted = calculateElapsedTime();
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
      // Vibration.vibrate(500);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TouchableOpacity onPress={handleImagePress} style={styles.overlay} />
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
        <Head
          ishome={false}
          name={lang[i].Moksha}
          navigation={navigation}
          route={route}
        />
      </View>
      <Text style={styles.prayercount}>
        {mala} - {prayerCount}
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    top: 10,
    left: -80,
    right: 0,
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
  img2: { height: 45, width: 45 },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  prayercount: {
    color: 'white',
    fontSize: 90,
    position: 'absolute',
    marginTop: '70%',
    marginLeft: '29%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: 150,
    zIndex: 1,
    marginLeft: '8%',
    width: 340,
    marginBottom: 110,
  },
});

export default PrayerScreen;

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
