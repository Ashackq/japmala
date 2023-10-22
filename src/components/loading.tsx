import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen = ({ navigation, route }: HomeProps) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const esttime = route.params.esttime;
  const elapsedtime = route.params.elapsedtime;
  const i = route.params.languageindex;
  const malatime = route.params.malatime;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home', {
        totalcount: totalcount,
        beadcount: beadcount,
        target: target,
        mala: mala,
        esttime: esttime,
        elapsedtime: elapsedtime,
        languageindex: i,
        malatime: malatime,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../devdata/assets/loading.jpg')}
        resizeMode="cover"
      />
      <Text style={styles.appby}>App By ABCOM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  appby: {
    position: 'absolute',
    top: 220,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'red',
  },
});

export default LoadingScreen;
