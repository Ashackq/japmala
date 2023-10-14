import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Image,
} from 'react-native';
const Editback = require('../assets/editback.jpg');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Foot } from '../components';
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
  const beadcount = route.params?.beadcount;

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
        });
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation, beadsInMala, meditime, target, mala, totalcount, esttime]);
  useEffect(() => {
    if (route.params?.meditime) {
      setMeditime(route.params.meditime);
    }
  }, [route.params?.meditime]);

  const handleSave = () => {
    navigation.setParams({ target, beadcount: beadsInMala });
  };

  const handleReset = () => {
    setBeadsInMala(108);
    setTarget(100000);
    setMeditime('00:00:00');
    setMala(0);
    settotalcount(0);
  };
  const calculateEstimatedTotalTime = () => {
    const [estHours, estMinutes, estSeconds] = esttime.split(':').map(Number);
    const totalEstSeconds = estHours * 3600 + estMinutes * 60 + estSeconds;
    const estimatedTotalSeconds = totalEstSeconds * away;
    return formatTime(estimatedTotalSeconds);
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
      <Image source={Editback} style={styles.img} />
      {/* Contents */}
      <View style={styles.container1}>
        <View style={styles.whiteBox}>
          <Text style={styles.label}>Set Your Target</Text>
          <TextInput
            style={styles.input}
            value={target.toString()} // Ensure the value is a string for TextInput
            keyboardType="numeric"
            onChangeText={(text) => setTarget(parseInt(text, 10))}
          />
          <Text style={styles.defaultLabel}>Default: 100000</Text>

          <Text style={styles.label}>Mala Beads</Text>
          <TextInput
            style={styles.input}
            value={beadsInMala.toString()} // Ensure the value is a string for TextInput
            keyboardType="numeric"
            onChangeText={(text) => setBeadsInMala(parseInt(text, 10))}
          />
          <Text style={styles.defaultLabel}>Default: 108</Text>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.defaultLabel}>Save</Text>
          </TouchableOpacity>
        </View>
        {/* Previous meditation details */}
        <View style={styles.greyBox}>
          <Text style={styles.text}>Meditation so far: {meditime}</Text>
          <Text style={styles.text}>
            Total count: {totalcount + mala * beadcount}
          </Text>
          <Text style={styles.text}>Target: {target}</Text>
          <Text style={styles.text}>Beads count: {beadcount}</Text>
        </View>
        {/* Grey box */}
        <View style={styles.greyBox}>
          <Text style={styles.text}>Mala Completed: {mala}</Text>
          <Text style={styles.text}>
            You are {Math.ceil(away)} malas away from your goal
          </Text>
          <Text style={styles.text}>
            Time estimation for completion {estimatedTotalTime}
          </Text>
        </View>
        <View style={styles.resetBox}>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.defaultLabel}>Reset</Text>
          </TouchableOpacity>
          <Text style={styles.warningLabel}>
            Warning: Setting new target resets all counters to zero.
          </Text>
        </View>
      </View>
      <Foot navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
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
