import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing,
} from 'react-native';
import React, { useEffect, useState } from 'react';
const Home = require('../assets/Home.png');
const Edit = require('../assets/edit.jpg');
const Help = require('../assets/help.png');

const Footer = ({ navigation, route }) => {
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const elapsedtiem = route.params.elapsedtime;
  const meditime = route.params.meditime;
  const esttime = route.params.esttime;
  const [activeIcon, setActiveIcon] = useState('Home');

  useEffect(() => {
    // Update the active icon based on the route name
    if (route.name === 'Edit') {
      setActiveIcon('Edit');
    } else if (route.name === 'Help') {
      setActiveIcon('Help');
    } else {
      setActiveIcon('Home');
    }
  }, [route.name]);

  const handleIconPress = (iconName: string) => {
    setActiveIcon(iconName);

    console.log(`${iconName} button pressed.`);
    let targetRoute = '';
    if (iconName === 'Home') {
      targetRoute = 'Home';
    } else if (iconName === 'Edit') {
      targetRoute = 'Edit';
    } else if (iconName === 'Help') {
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
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => handleIconPress('Home')}
          style={[
            styles.bottomBarButton,
            activeIcon === 'Home' && styles.activeButton,
          ]}
        >
          <Image
            source={Home}
            style={[styles.icon, activeIcon === 'Home' && styles.activeIcon]}
          />
          {activeIcon === 'Home' && <Text style={styles.aftertext}>Home</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress('Edit')}
          style={[
            styles.bottomBarButton,
            activeIcon === 'Edit' && styles.activeButton,
          ]}
        >
          <Image
            source={Edit}
            style={[styles.icon, activeIcon === 'Edit' && styles.activeIcon]}
          />
          {activeIcon === 'Edit' && <Text style={styles.aftertext}>Edit</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress('Help')}
          style={[
            styles.bottomBarButton,
            activeIcon === 'Help' && styles.activeButton,
          ]}
        >
          <Image
            source={Help}
            style={[styles.icon, activeIcon === 'Help' && styles.activeIcon]}
          />
          {activeIcon === 'Help' && <Text style={styles.aftertext}>Help</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    backgroundColor: '#8f1c44',
  },
  bottomBarButton: {
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 12,
    flexDirection: 'row',
  },
  icon: {
    height: 25,
    width: 25,
  },
  activeIcon: {
    tintColor: '#FF0000',
  },
  activeButton: {
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aftertext: {
    color: 'black',
    fontSize: 16,
    marginLeft: 11,
  },
});

export default Footer;
