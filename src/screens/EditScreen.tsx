import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ScrollView,
} from 'react-native';

import { lang } from '../devdata/constants/languages';
import { Snackbar } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Langsel } from '../components';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

const EditScreen = ({ navigation, route }: HomeProps) => {
  const target = route.params.target;
  const beadsInMala = route.params.beadcount;
  const totalcount = route.params.totalcount;
  const mala = route.params.mala;
  const [i, setSelectedLanguageIndex] = useState(route.params.languageindex);
  const handleLanguageChange = (value: number) => {
    setSelectedLanguageIndex(value);
  };

  const malatime = route.params.malatime;
  const elapsedtime = route.params.elapsedtime;
  const esttime = route.params.esttime;
  console.log('TImes e- ', '\n', malatime, '\n', esttime, '\n', elapsedtime);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.replace('Home', {
          target: target,
          beadcount: beadsInMala,
          totalcount: totalcount,
          mala: mala,
          elapsedtime: elapsedtime,
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
    target,
    mala,
    totalcount,
    esttime,
    i,
    malatime,
    elapsedtime,
  ]);

  const handleSave = () => {
    const newTarget = parseInt(inputTarget, 10);
    const newBead = parseInt(inputbead, 10);
    if (newBead < 11) {
      setShowSnackbar(true);
      navigation.setParams({ beadcount: 108 });
    } else {
      navigation.setParams({ beadcount: newBead });
      setShowSnackbar(false);
    }
    if (newTarget <= 108) {
      setShowSnackbar2(true);
      navigation.setParams({ target: 100000 });
    } else {
      navigation.setParams({ target: newTarget });
      setShowSnackbar2(false);
    }
  };

  const handleReset = () => {
    navigation.setParams({ beadcount: 108 });
    navigation.setParams({ target: 100000 });
    navigation.setParams({ elapsedtime: '00:00:00' });
    navigation.setParams({ malatime: 0 });
    navigation.setParams({ esttime: '00:00:00' });
    navigation.setParams({ totalcount: 0 });
    navigation.setParams({ mala: 0 });

    handleSave();
  };
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar2, setShowSnackbar2] = useState(false);

  const [inputbead, setInputbead] = useState(beadsInMala.toString());
  const [inputTarget, setInputTarget] = useState(target.toString());

  return (
    <View style={styles.container}>
      <ScrollView style={styles.img}>
        {/* <Image source={Editback} style={styles.img} /> */}
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
              value={inputTarget}
              keyboardType="numeric"
              onChangeText={(text) => setInputTarget(text)}
            />
            <Text style={styles.defaultLabel}>{lang[i].default}: 100000</Text>

            <Text style={styles.label}>{lang[i].malabeads}</Text>
            <TextInput
              style={styles.input}
              value={inputbead}
              keyboardType="numeric"
              onChangeText={(text) => setInputbead(text)}
            />

            <Text style={styles.defaultLabel}>{lang[i].default}: 108</Text>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.defaultLabel}>{lang[i].save}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resetBox}>
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
              <Text style={styles.defaultLabel}>{lang[i].reset}</Text>
            </TouchableOpacity>
            <Text style={styles.warningLabel}>{lang[i].warning}</Text>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setShowSnackbar(false),
        }}
      >
        {lang[i].snack1}
      </Snackbar>
      <Snackbar
        visible={showSnackbar2}
        onDismiss={() => setShowSnackbar2(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setShowSnackbar2(false),
        }}
      >
        {lang[i].snack2}
      </Snackbar>
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
    backgroundColor: '#333333',
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

  resetBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    opacity: 0.9,
    marginBottom: 20,
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
