import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen = ({ navigation }: HomeProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home', {});
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
