import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
  Easing,
  Platform,
  Image,
} from 'react-native';
import { lang } from '../devdata/constants/languages';
import { env, colors } from '../devdata/constants/lang';

const Set = require('../devdata/assets/edit.jpg');
const Help = require('../devdata/assets/help.png');
const Info = require('../devdata/assets/info.jpg');
const Share = require('../devdata/assets/share.png');

const SideMenu = ({ toggleSideMenu, isMenuOpen, navigation, route }) => {
  const [slideAnim] = useState(new Animated.Value(-300));

  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const elapsedtiem = route.params.elapsedtime;
  const meditime = route.params.meditime;
  const esttime = route.params.esttime;
  const i = route.params.languageindex;
  const malatime = route.params.malatime;
  const displaytime = route.params.displaytime;

  const handleIconPress = (iconName: string) => {
    toggleSideMenu();
    console.log(`${iconName} button pressed.`);
    let targetRoute = '';
    if (iconName === 'Edit') {
      targetRoute = 'Edit';
    } else if (iconName === 'Help') {
      targetRoute = 'Help';
    } else if (iconName === 'Tnc') {
      targetRoute = 'Help';
    }
    navigation.push(targetRoute, {
      target: target,
      totalcount: totalcount,
      meditime: meditime,
      mala: mala,
      beadcount: beadcount,
      elapsedtiem: elapsedtiem,
      esttime: esttime,
      malatime: malatime,
      displaytime: displaytime,
      languageindex: i,
    });
  };
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? 0 : -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen, slideAnim]);

  const handleSharePress = async () => {
    const playStoreUrl =
      'https://play.google.com/store/apps/details?id=your.package.name';
    const appstoreurl =
      'https://apps.apple.com/sg/app/japa-mala/id984477920?platform=ipad';

    if (Platform.OS === 'android') {
      Linking.openURL(playStoreUrl);
    } else {
      Linking.openURL(appstoreurl);
    }
  };

  const handleWebAppsPress = () => {
    const url = 'http://www.abcom.com/iosapps.html';
    const andyurl = 'http://www.abcom.com/androidapps.html';

    if (Platform.OS === 'android') {
      Linking.openURL(andyurl);
    } else {
      Linking.openURL(url);
    }
  };

  const handlemorePress = () => {
    const andyurl =
      'https://play.google.com/store/apps/developer?id=ABCOM&hl=en&gl=US';
    const url = 'https://apps.apple.com/sg/developer/abcom/id327443601';
    if (Platform.OS === 'android') {
      Linking.openURL(andyurl);
    } else {
      Linking.openURL(url);
    }
  };
  return (
    <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
      <TouchableOpacity onPress={toggleSideMenu} activeOpacity={1}>
        <View style={styles.sideMenu}>
          <Text style={styles.alertTitle}>{lang[i].Moksha}</Text>
          <Text style={styles.alertContent}>
            Copyright@2015-21
            {'\n'}
            ABCOM Information Systems Pvt Ltd
          </Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIconPress('Edit')}
            >
              <Image source={Set} style={styles.icon} />
              <Text style={styles.buttonText}>{lang[i].settings}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIconPress('Tnc')}
            >
              <Image source={Info} style={styles.icon} />
              <Text style={styles.buttonText}>{lang[i].tnc}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIconPress('Help')}
            >
              <Image source={Help} style={styles.icon} />
              <Text style={styles.buttonText}>{lang[i].help}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSharePress}>
              <Image source={Share} style={styles.icon} />
              <Text style={styles.buttonText}>{lang[i].share}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.alertButtonContainer}>
            <TouchableOpacity
              onPress={handleWebAppsPress}
              style={styles.alertButton}
            >
              <Text style={styles.text}>{lang[i].web}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlemorePress}
              style={styles.alertButton}
            >
              <Text style={styles.text}>{lang[i].more}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.alertVersion}>Version: {env.version}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 100,
  },
  icon: {
    height: 25,
    width: 25,
    tintColor: colors.headfootbuttontext,
    position: 'absolute',
    left: 10,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    paddingLeft: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sideMenu: {
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 870,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 2000,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'relative',
    left: -40,
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
  },
  alertTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  alertVersion: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 12,
    right: 75,
    fontSize: 12,
  },
  alertContent: {
    textAlign: 'center',
  },
  alertButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    width: 250,
  },
  alertButton: {
    marginLeft: -80,
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertButtonDivider: {
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  text: { color: 'red' },
});

export default SideMenu;
