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
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

const EditScreen = ({ navigation, route }: HomeProps) => {
  const [target, setTarget] = useState(route.params?.target || 100000);
  const [beadsInMala, setBeadsInMala] = useState(
    route.params?.beadcount || 108
  );

  const [meditime, setMeditime] = useState(
    route.params?.meditime || '00:00:00'
  );
  const totalcount = route.params.totalcount;
  const mala = route.params.mala;
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
        });
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation, beadsInMala, meditime, target, mala, totalcount]);
  useEffect(() => {
    if (route.params?.meditime) {
      setMeditime(route.params.meditime);
    }
  }, [route.params?.meditime]);

  const handleSave = () => {
    navigation.setParams({ target, beadcount: beadsInMala });
  };

  const handleReset = () => {
    navigation.setParams({
      target: 100000,
      beadcount: 108,
      meditime: '00:00:00',
    });
    setMeditime('00:00:00');
  };

  return (
    <View style={styles.container}>
      <Image source={Editback} style={styles.img} />
      {/* White box */}
      <View style={styles.whiteBox}>
        <Text style={styles.label}>Set Your Target</Text>
        <TextInput
          style={styles.input}
          value={target.toString()} // Ensure the value is a string for TextInput
          keyboardType="numeric"
          onChangeText={(text) => setTarget(parseInt(text, 10))}
        />
        <Text style={styles.defaultLabel}>Default: 100000</Text>

        <Text style={styles.label}>Number of Beads In Mala</Text>
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

      <View style={styles.greyBox}>
        <Text>To meet your target</Text>
        <Text>You Need To Do {Math.ceil(target / beadsInMala)} malas</Text>
        <Text>Time Spent In Prayer Screen: {meditime}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  img: {
    position: 'absolute',
    top: 0,
    width: 440,
    height: 900,
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
    opacity: 0.9,
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
});

export default EditScreen;
