import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Head } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';
import { env } from '../devdata/constants/lang';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'About'>;

const About = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;
  return (
    <View style={styles.cont}>
      <View style={styles.head}>
        <Head name={lang[i].info} navigation={navigation} route={route} />
      </View>
      <Text style={[styles.alertTitle, styles.text]}>{lang[i].appname}</Text>
      <Text style={[styles.alertVersion, styles.text]}>
        (Version: {env.version})
      </Text>
      <Text style={[styles.alertContent, styles.text]}>
        Copyright@2023 {'\n'}
        ABCOM Information Systems Pvt. Ltd.
      </Text>
      <Text style={[styles.alertContent, styles.text]}>
        Credits:{'\n'}
        This App was developed for ABCOM by Akash Patel{'\n'}
        ABCOM Information Systems Pvt. Ltd.
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
    marginVertical: 10,
  },
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 500,
  },
  alertVersion: {
    textAlign: 'center',
    position: 'relative',
    fontSize: 12,
    marginTop: 5,
  },
  text: { color: 'white' },
});
