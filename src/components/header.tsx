import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';

const Share = require('../assets/share.png');
const Info = require('../assets/info.jpg');

const header = ({ ishome, name }) => {
  const handleSharePress = () => {
    console.log('Share button pressed.');
  };

  const handleInfoPress = () => {
    console.log('Info button pressed.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {ishome && (
          <TouchableOpacity
            onPress={handleSharePress}
            style={styles.headerButton}
          >
            <Image source={Share} style={styles.icon} />
          </TouchableOpacity>
        )}

        <Text style={styles.headerTitle}>{name}</Text>

        {ishome && (
          <TouchableOpacity
            onPress={handleInfoPress}
            style={styles.headerButton}
          >
            <Image source={Info} style={styles.icon} />
          </TouchableOpacity>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#A6D1E6',
    top: 0,
    position: 'absolute',
  },
  headerButton: {
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    height: 25,
    width: 25,
    marginHorizontal: 100,
  },
});
export default header;
