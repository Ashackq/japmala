import { StyleSheet, Text, View, BackHandler, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Head } from '../components';
const Editback = require('../assets/editback.jpg');
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Help'>;

const Help = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const elapsedtiem = route.params.elapsedtime;
  const meditime = route.params.meditime;
  const esttime = route.params.esttime;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.replace('Home', {
          target: target,
          meditime: meditime,
          beadcount: beadcount,
          totalcount: totalcount,
          mala: mala,
          elapsedtime: elapsedtiem,
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
    meditime,
    target,
    mala,
    totalcount,
    esttime,
    beadcount,
    elapsedtiem,
  ]);
  return (
    <View style={styles.container1}>
      <Image source={Editback} style={styles.img} />
      <Head ishome={false} name={'Help'} />
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome to the Meditation Tracker App!
        </Text>

        <Text style={styles.paragraph}>
          This app helps you track your meditation progress. The default goal is
          set to 1,00,000 (One lac), and the number of beads in a Mala is set to
          108. You can customize your preferred goal and Mala bead count on the
          Settings screen. The app instantly calculates the total number of
          Malas required to achieve your goal whenever you modify these figures.
        </Text>

        <Text style={styles.paragraph}>
          When you start your meditation, the timer begins automatically. If you
          need a break, simply tap the Pause button. The timer will resume
          automatically when you restart your meditation. If you've finished for
          the day, tap the Back button to return to the opening screen, which
          displays statistics of your meditation progress so far. It also
          provides an estimate of the remaining time to achieve your goal, based
          on your average meditation duration.
        </Text>

        <Text style={styles.paragraph}>
          The app allows you to meditate with your eyes closed. A beep sound
          indicates the completion of a Mala, and a different tone signifies
          when you've reached your goal. The completed Mala count is always
          displayed on the main screen.
        </Text>

        <Text style={styles.paragraph}>
          Welcome to the world of Meditation! Start your journey to inner peace
          and mindfulness.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    position: 'absolute',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: -150,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  img: {
    position: 'absolute',
    top: 0,
    width: 440,
    height: 900,
  },
});

export default Help;
