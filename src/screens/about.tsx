import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import React from 'react';
const Editback = require('../devdata/assets/editback.jpg');
import { Head } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';
import { env } from '../devdata/constants/lang';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'About'>;

const About = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;
  const openLinkedInProfile = () => {
    const linkedInURL = 'https://in.linkedin.com/in/akash-patel-8a6107237';
    Linking.openURL(linkedInURL);
  };
  const openWebsite = () => {
    const linkedInURL1 = 'http://abcom.com/';
    Linking.openURL(linkedInURL1);
  };
  return (
    <View style={styles.cont}>
      <View style={styles.head}>
        <Head name={lang[i].info} navigation={navigation} route={route} />
      </View>
      <Image source={Editback} style={styles.img} />
      <View style={styles.contt}>
        <Text style={[styles.alertTitle, styles.text]}>{lang[i].appname}</Text>
        <Text style={[styles.alertVersion, styles.text]}>
          (Version: {env.version})
        </Text>
        <Text style={[styles.alertContent, styles.text]}>
          Copyright@2023 {'\n'}
          <TouchableOpacity onPress={openLinkedInProfile} activeOpacity={1}>
            <Text style={styles.text1}>
              ABCOM Information Systems Pvt. Ltd.
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={styles.alertContent1}>
        <Text style={styles.text}>
          Credits:{'\n'}
          This App was developed for ABCOM by{'\n'}
          <TouchableOpacity onPress={openLinkedInProfile} activeOpacity={1}>
            <Text style={styles.text1}>Akash Patel</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contt: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    opacity: 0.9,
  },
  alertTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  img: {
    position: 'absolute',
    height: 800,
    width: 500,
    bottom: 0,
    right: -50,
  },
  alertContent: {
    textAlign: 'center',
    marginVertical: 10,
  },
  alertContent1: {
    position: 'absolute',
    bottom: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    opacity: 0.9,
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
  text: { color: 'black', fontWeight: 'bold' },
  text1: { color: '#EC7357', textDecorationLine: 'underline' },
});
