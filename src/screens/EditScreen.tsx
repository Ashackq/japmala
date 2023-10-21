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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Langsel } from '../components';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

const EditScreen = ({ navigation, route }: HomeProps) => {
  const target = route.params.target;
  const beadsInMala = route.params.beadcount;
  const totalcount = route.params.totalcount;
  const mala = route.params.mala;
  const beadcount = route.params.beadcount;
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
    console.log(' beads - ', beadcount);
    console.log(' Target - ', target);
    console.log(' Total Count - ', totalcount);
    console.log(' Mala - ', mala);
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
              value={target.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                let value = parseInt(text, 10);
                if (!isNaN(value)) {
                  navigation.setParams({ target: value });
                } else {
                  value = 0;
                  navigation.setParams({ target: value });
                }
              }}
            />
            <Text style={styles.defaultLabel}>{lang[i].default}: 100000</Text>

            <Text style={styles.label}>{lang[i].malabeads}</Text>
            <TextInput
              style={styles.input}
              value={beadsInMala.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                let value = parseInt(text, 10);
                if (!isNaN(value)) {
                  navigation.setParams({ beadcount: value });
                } else {
                  value = 0;
                  navigation.setParams({ beadcount: value });
                }
              }}
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
