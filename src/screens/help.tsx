import { StyleSheet, Text, View, BackHandler, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Head } from '../components';
const Editback = require('../devdata/assets/editback.jpg');
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Help'>;

const Help = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);
  return (
    <View style={styles.container1}>
      <Image source={Editback} style={styles.img} />
      <View style={styles.head}>
        <Head
          ishome={false}
          name={lang[i].help}
          navigation={navigation}
          route={route}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>{lang[i].helphead}</Text>

        <Text style={styles.paragraph}>{lang[i].para1}</Text>

        <Text style={styles.paragraph}>{lang[i].para2}</Text>

        <Text style={styles.paragraph}>{lang[i].para3}</Text>

        <Text style={styles.paragraph}>{lang[i].para4}</Text>
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
    marginBottom: -30,
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
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 500,
  },
});

export default Help;
