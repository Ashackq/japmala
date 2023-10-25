import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ScrollView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { lang } from '../devdata/constants/languages';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Cmodal, Head, Langsel } from '../components';
import { Snackbar } from 'react-native-paper';
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbar2, setShowSnackbar2] = useState(false);
  const [showSnackbar1, setShowSnackbar1] = useState(false);
  const [inputbead, setInputbead] = useState(beadsInMala.toString());
  const [inputTarget, setInputTarget] = useState(target.toString());

  const [showResetModal, setShowResetModal] = useState(false);

  const malatime = route.params.malatime;
  const elapsedtime = route.params.elapsedtime;
  const esttime = route.params.esttime;

  const handleOpenResetModal = () => {
    setShowResetModal(true);
  };

  const handleCloseResetModal = () => {
    setShowResetModal(false);
  };

  const storeProgressData = async (data) => {
    try {
      await AsyncStorage.setItem('progress', JSON.stringify(data));
      console.log('Progress', data);
    } catch (error) {
      console.error('Error saving progress data:', error);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        storeProgressData({
          target: target,
          totalcount: totalcount,
          mala: mala,
          beadcount: beadsInMala,
          esttime: esttime,
          elapsedtime: elapsedtime,
          languageindex: i,
          malatime: malatime,
        });
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
    } else {
      navigation.setParams({ beadcount: newBead });
      setShowSnackbar(false);
    }
    if (newTarget < 108) {
      setShowSnackbar2(true);
    } else {
      navigation.setParams({ target: newTarget });
      setShowSnackbar2(false);
    }
    setShowSnackbar1(true);
    handleSaveReset();
  };
  const handleSaveReset = () => {
    const newTarget = parseInt(inputTarget, 10);
    const newBead = parseInt(inputbead, 10);

    navigation.setParams({ beadcount: newBead });
    navigation.setParams({ target: newTarget });
    navigation.setParams({ elapsedtime: '00:00:00' });
    navigation.setParams({ malatime: 0 });
    navigation.setParams({ esttime: '00:00:00' });
    navigation.setParams({ totalcount: 0 });
    navigation.setParams({ mala: 0 });
    navigation.setParams({ languageindex: i });
    storeProgressData({
      target: newTarget,
      totalcount: 0,
      mala: 0,
      beadcount: newBead,
      esttime: '00:00:00',
      languageindex: i,
      malatime: '00:00:00',
      elapsedtime: '00:00:00',
    });
  };
  const handleReset = () => {
    navigation.setParams({ beadcount: 108 });
    navigation.setParams({ target: 100000 });
    navigation.setParams({ elapsedtime: '00:00:00' });
    navigation.setParams({ malatime: 0 });
    navigation.setParams({ esttime: '00:00:00' });
    navigation.setParams({ totalcount: 0 });
    navigation.setParams({ mala: 0 });
    setInputTarget('100000');
    setInputbead('108');
    storeProgressData({
      target: 100000,
      totalcount: 0,
      mala: 0,
      beadcount: 108,
      esttime: '00:00:00',
      languageindex: i,
      malatime: '00:00:00',
      elapsedtime: '00:00:00',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Head name={lang[i].edit} navigation={navigation} route={route} />
      </View>
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
            <TouchableOpacity
              onPress={handleOpenResetModal}
              style={styles.resetButton}
            >
              <Text style={styles.defaultLabel}>{lang[i].reset}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Cmodal
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        message={lang[i].snack1}
        Dismiss={lang[i].dismiss}
      />
      <Cmodal
        visible={showSnackbar2}
        onDismiss={() => setShowSnackbar2(false)}
        message={lang[i].snack2}
        Dismiss={lang[i].dismiss}
      />

      <Modal visible={showResetModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.warningLabel}>{lang[i].warning}</Text>
            <TouchableOpacity
              onPress={() => {
                handleReset();
                handleCloseResetModal();
              }}
              style={styles.resetButton1}
            >
              <Text style={styles.buttonLabel}>{lang[i].reset}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseResetModal}
              style={styles.resetButton1}
            >
              <Text style={styles.buttonLabel}>{lang[i].cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Snackbar
        visible={showSnackbar1}
        onDismiss={() => setShowSnackbar1(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setShowSnackbar1(false),
        }}
      >
        {lang[i].settingssave}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
  container1: {
    flexGrow: 1,
    padding: 20,
  },
  img: {
    backgroundColor: '#333333',
    marginTop: 70,
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
  buttonLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
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
});

export default EditScreen;
