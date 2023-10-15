import { StyleSheet, Text, View, BackHandler, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Foot, Head } from '../components';
const Editback = require('../devdata/assets/editback.jpg');
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Help'>;

const Help = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const elapsedtiem = route.params.elapsedtime;
  const meditime = route.params.meditime;
  const esttime = route.params.esttime;
  const i = route.params.languageindex;

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
    meditime,
    target,
    mala,
    totalcount,
    esttime,
    beadcount,
    elapsedtiem,
    i,
  ]);
  return (
    <View style={styles.container1}>
      <Image source={Editback} style={styles.img} />
      <Head ishome={false} name={lang[i].help} route={route} />
      <View style={styles.container}>
        <Text style={styles.header}>{lang[i].helphead}</Text>

        <Text style={styles.paragraph}>{lang[i].para1}</Text>

        <Text style={styles.paragraph}>{lang[i].para2}</Text>

        <Text style={styles.paragraph}>{lang[i].para3}</Text>

        <Text style={styles.paragraph}>{lang[i].para4}</Text>
      </View>
      <Foot
        navigation={navigation}
        route={route}
        i={i}
        target={target}
        beadcount={beadcount}
        esttime={esttime}
        elapsedtiem="00:00:00"
        mala={mala}
        meditime={meditime}
        totalcount={totalcount}
      />
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
    bottom: 20,
    width: 440,
    height: 900,
  },
});

export default Help;
