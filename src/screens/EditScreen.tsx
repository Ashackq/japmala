import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Image,
  ScrollView,
} from 'react-native';
const Editback = require('../devdata/assets/editback.jpg');

import { lang } from '../devdata/constants/languages';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Foot, Langsel } from '../components';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

const EditScreen = ({ navigation, route }: HomeProps) => {
  const [target, setTarget] = useState(route.params?.target || 100000);
  const [beadsInMala, setBeadsInMala] = useState(
    route.params?.beadcount || 108
  );

  const [meditime, setMeditime] = useState(
    route.params?.meditime || '00:00:00'
  );
  const esttime = route.params.esttime;
  const [totalcount, settotalcount] = useState(route.params.totalcount);
  const [mala, setMala] = useState(route.params.mala);
  const beadcount = route.params.beadcount;

  const [i, setSelectedLanguageIndex] = useState(route.params.languageindex);
  const handleLanguageChange = (value: number) => {
    setSelectedLanguageIndex(value);
  };
  const malatime = route.params.malatime;

  const away = target / beadcount - mala;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.replace('Home', {
          target: target,
          meditime: meditime,
          beadcount: beadsInMala,
          totalcount: totalcount,
          mala: mala,
          elapsedtime: '00:00:00',
          esttime: esttime,
          languageindex: i,
          malatime: malatime,
        });
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [
    navigation,
    beadsInMala,
    meditime,
    target,
    mala,
    totalcount,
    esttime,
    i,
    malatime,
  ]);

  const handleSave = () => {
    console.log(' beads - ', beadcount);
  };

  const handleReset = () => {
    setBeadsInMala(108);
    setTarget(100000);
    setMeditime('00:00:00');
    setMala(0);
    settotalcount(0);
    handleSave();
  };
  const calculateEstimatedTotalTime = () => {
    const [estHours, estMinutes, estSeconds] = esttime.split(':').map(Number);
    const totalEstSeconds = estHours * 3600 + estMinutes * 60 + estSeconds;
    const estimatedTotalSeconds = totalEstSeconds * away;
    return formatTime(Math.ceil(estimatedTotalSeconds));
  };
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const estimatedTotalTime = calculateEstimatedTotalTime();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={Editback} style={styles.img} />
        {/* Contents */}
        <View style={styles.container1}>
          <View style={styles.whiteBox}>
            <Text style={styles.label}>{lang[i].selectlanguage}</Text>
            <Langsel
              selectedindex={i}
              setSelectedindex={handleLanguageChange}
              navigation={navigation}
            />
            <Text style={styles.label}>{lang[i].setyourtarget}</Text>
            <TextInput
              style={styles.input}
              value={target.toString()} // Ensure the value is a string for TextInput
              keyboardType="numeric"
              onChangeText={(text) => setTarget(parseInt(text, 10))}
            />
            <Text style={styles.defaultLabel}>{lang[i].default}: 100000</Text>

            <Text style={styles.label}>{lang[i].malabeads}</Text>
            <TextInput
              style={styles.input}
              value={beadsInMala.toString()} // Ensure the value is a string for TextInput
              keyboardType="numeric"
              onChangeText={(text) => setBeadsInMala(parseInt(text, 10))}
            />
            <Text style={styles.defaultLabel}>{lang[i].default}: 108</Text>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.defaultLabel}>{lang[i].save}</Text>
            </TouchableOpacity>
          </View>
          {/* Previous meditation details */}
          <View style={styles.greyBox}>
            <Text style={styles.text}>
              {lang[i].meditaionsofar}: {meditime}
            </Text>
            <Text style={styles.text}>
              {lang[i].totalcount}: {totalcount + mala * beadsInMala}
            </Text>
            <Text style={styles.text}>
              {lang[i].target}: {target}
            </Text>
            <Text style={styles.text}>
              {lang[i].beadcont}: {beadsInMala}
            </Text>
          </View>
          {/* Grey box */}
          <View style={styles.greyBox}>
            <Text style={styles.text}>
              {lang[i].malascomp}: {mala}
            </Text>
            <Text style={styles.text}>
              {lang[i].youare} {Math.ceil(away)} {lang[i].goalaway}
            </Text>
            <Text style={styles.text}>
              {lang[i].timeforcomp} {estimatedTotalTime}
            </Text>
          </View>
          <View style={styles.resetBox}>
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
              <Text style={styles.defaultLabel}>{lang[i].reset}</Text>
            </TouchableOpacity>
            <Text style={styles.warningLabel}>{lang[i].warning}</Text>
          </View>
        </View>
      </ScrollView>
      <Foot
        navigation={navigation}
        route={route}
        i={i}
        target={target}
        beadcount={beadsInMala}
        totalcount={totalcount}
        esttime={esttime}
        elapsedtiem="00:00:00"
        mala={mala}
        meditime={meditime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flexGrow: 1,
    padding: 20,
  },
  img: {
    position: 'absolute',
    width: 440,
    height: 900,
    bottom: 20,
    left: -15,
  },
  whiteBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.9,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 28,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  defaultLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  greyBox: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.8,
  },

  resetBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    opacity: 0.9,
    marginBottom: 50,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  warningLabel: {
    fontSize: 12,
    color: 'red',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default EditScreen;
