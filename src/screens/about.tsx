import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Head } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'About'>;

const About = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;
  return (
    <View style={styles.cont}>
      <View style={styles.head}>
        <Head
          ishome={false}
          name={lang[i].info}
          navigation={navigation}
          route={route}
        />
      </View>
      <Text style={[styles.alertTitle, styles.text]}>{lang[i].appname}</Text>
      <Text style={[styles.alertContent, styles.text]}>
        Copyright@2015-21
        {'\n'}
        ABCOM Information Systems Pvt Ltd
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#333333',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  alertContent: {
    textAlign: 'center',
  },
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 500,
  },
  text: { color: 'white' },
});
