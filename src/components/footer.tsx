import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
const Donate = require('../assets/donate.png');
const Edit = require('../assets/edit.jpg');
const Help = require('../assets/help.png');

const footer = ({ navigation, route }) => {
  const handleDonatePress = () => {
    console.log('Donate button pressed.');
  };
  const totalcount = route.params.totalcount;
  const beadcount = route.params.beadcount;
  const target = route.params.target;
  const mala = route.params.mala;
  const meditime = route.params.meditime;
  const handleEditPress = () => {
    navigation.push('Edit', {
      target: target,
      totalcount: totalcount,
      meditime: meditime,
      mala: mala,
      beadcount: beadcount,
    });
    console.log('Edit button pressed.');
  };

  const handleHelpPress = () => {
    console.log('Help button pressed.');
  };
  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={handleDonatePress}
          style={styles.bottomBarButton}
        >
          <Image source={Donate} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEditPress}
          style={styles.bottomBarButton}
        >
          <Image source={Edit} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHelpPress}
          style={styles.bottomBarButton}
        >
          <Image source={Help} style={styles.icon} />
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
    padding: 5,
    backgroundColor: '#4A403A',
    marginBottom: 20,
  },
  bottomBarButton: {
    padding: 10,
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default footer;
