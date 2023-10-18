/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { lang } from '../devdata/constants/languages';
import { env } from '../devdata/constants/lang';

const SideMenu = ({ toggleSideMenu, i, isMenuOpen }) => {
  const [slideAnim] = useState(new Animated.Value(-300));
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isMenuOpen ? 0 : -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen, slideAnim]);

  const handleInfoPress = () => {
    console.log('Info button pressed.');
    setIsInfoModalVisible(true);
  };

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

  return (
    <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
      <TouchableOpacity onPress={toggleSideMenu} activeOpacity={1}>
        <View style={styles.sideMenu}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{lang[i].edit}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{lang[i].tnc}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{lang[i].help}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleInfoPress}>
              <Text style={styles.buttonText}>{lang[i].info}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSharePress}>
              <Text style={styles.buttonText}>{lang[i].share}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              transparent
              visible={isInfoModalVisible}
              animationType="slide"
            >
              <CustomAlertDialog
                closeModal={() => setIsInfoModalVisible(false)}
                i={i}
              />
            </Modal>
          </View>
          <Text style={{ position: 'absolute', bottom: 10, right: 10 }}>
            Version: {env.version}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CustomAlertDialog = ({ closeModal, i }) => {
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
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>{lang[i].Moksha}</Text>
      <Text style={styles.alertVersion}>(Version 1.4.1)</Text>

      <Text style={styles.alertContent}>
        {'\n'}
        Copyright@2015-21
        {'\n'}
        ABCOM Information Systems Pvt Ltd
      </Text>

      <View style={styles.alertButtonContainer}>
        <TouchableOpacity
          onPress={handleWebAppsPress}
          style={styles.alertButton}
        >
          <Text style={styles.text}>{lang[i].web}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlemorePress} style={styles.alertButton}>
          <Text style={styles.text}>{lang[i].more}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={closeModal} style={styles.alertButton}>
        <Text style={styles.text}>{lang[i].Ok}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 100,
  },

  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logout: { color: '#A81919' },

  sideMenu: {
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 1000,
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    marginTop: '50%',
    alignSelf: 'center',
  },
  alertTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  alertVersion: {
    textAlign: 'center',
    marginTop: -5,
    fontSize: 12,
  },
  alertDivider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  alertContent: {
    textAlign: 'center',
  },
  alertButtonContainer: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    marginTop: 10,
  },
  alertButton: {
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
