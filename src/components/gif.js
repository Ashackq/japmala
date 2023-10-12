import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

const Bead = require('../assets/bead.gif');
const Behe = require('../assets/bead.jpg');

const Gifff = ({ togglePlayPause, isPlaying }) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.gif}
        source={isPlaying ? Bead : Behe}
        resizeMode={FastImage.resizeMode.contain}
      />
      {!isPlaying && <View style={styles.overlay} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 400,
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Gifff;
