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
  Share as Give,
} from 'react-native';
import { lang } from '../devdata/constants/languages';
import { env, colors } from '../devdata/constants/lang';

const Set = require('../devdata/assets/edit.jpg');
const Help = require('../devdata/assets/help.png');
const Info = require('../devdata/assets/info.jpg');
const Share = require('../devdata/assets/share.png');
const Moreapps = require('../devdata/assets/moreapps.png');
const Appspolicy = require('../devdata/assets/appspolicy.png');

const SideMenu = ({ toggleSideMenu, isMenuOpen, navigation, route }) => {
  const [slideAnim] = useState(new Animated.Value(-300));

  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const elapsedtime = route.params.elapsedtime;
  const esttime = route.params.esttime;
  const i = route.params.languageindex;
  const displaytime = route.params.displaytime;
  const malatime = route.params.malatime;

  const handleIconPress = (iconName: string) => {
    toggleSideMenu();
    console.log(`${iconName} button pressed.`);
    let targetRoute = '';
    if (iconName === 'Edit') {
      targetRoute = 'Edit';
    } else if (iconName === 'Help') {
      targetRoute = 'Help';
    } else if (iconName === 'Tnc') {
      targetRoute = 'Tnc';
    } else if (iconName === 'About') {
      targetRoute = 'About';
    }
    navigation.push(targetRoute, {
      target: target,
      totalcount: totalcount,
      mala: mala,
      beadcount: beadcount,
      languageindex: i,
      elapsedtime: elapsedtime,
      esttime: esttime,
      displaytime: displaytime,
      malatime: malatime,
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
    try {
      const shareOptions = {
        title: 'Share via',
        message: 'Check out this awesome app!',
        url: 'https://your-app-url.com', // Replace with your app's URL
      };

      const result = await Give.share(shareOptions);

      if (result.action === Give.sharedAction) {
        if (result.activityType) {
          // Shared via an activity type (e.g., email, message)
          console.log(`Shared via ${result.activityType}`);
        } else {
          // Shared directly
          console.log('Shared directly');
        }
      } else if (result.action === Give.dismissedAction) {
        console.log('Share sheet dismissed');
      }
    } catch (error) {
      console.error(error);
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

  console.log('TImes e- ', '\n', malatime, '\n', esttime, '\n', elapsedtime);
  return (
    <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
      <TouchableOpacity onPress={toggleSideMenu} activeOpacity={1}>
        <View style={styles.sideMenu}>
          <Text style={styles.alertTitle}>{lang[i].appname}</Text>

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
              <Image source={Appspolicy} style={styles.icon} />
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

            <TouchableOpacity style={styles.button} onPress={handlemorePress}>
              <Image source={Moreapps} style={styles.icon} />
              <Text style={styles.buttonText}>{lang[i].more}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleIconPress('About')}
            >
              <Image source={Info} style={styles.icon} />
              <Text style={styles.buttonText}>{lang[i].info}</Text>
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
    right: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    paddingLeft: 10,
    justifyContent: 'flex-start',
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
  alertVersion: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 12,
    right: 75,
    fontSize: 12,
  },
  alertTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: { color: 'red' },
});

export default SideMenu;
