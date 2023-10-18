import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../devdata/constants/lang';
import Sidemenu from './sidemenu';

const Ham = require('../devdata/assets/ham.png');

const Header = ({ ishome, name, i }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [isMenuOpen, setmenuopen] = useState(false);
  const toggleSideMenu = () => {
    setmenuopen(!isMenuOpen);
    setTimeout(() => {
      setShowSideMenu((prevIsMenuOpen) => !prevIsMenuOpen);
    }, 300);
  };
  return (
    <View style={styles.header}>
      {ishome && (
        <TouchableOpacity onPress={toggleSideMenu} style={styles.headerButton}>
          <Image source={Ham} style={styles.icon} />
        </TouchableOpacity>
      )}
      {showSideMenu && (
        <TouchableOpacity
          onPress={toggleSideMenu}
          style={styles.sideMenuOverlay}
          activeOpacity={1}
        />
      )}
      <View>
        {showSideMenu && (
          <Sidemenu
            toggleSideMenu={toggleSideMenu}
            i={i}
            isMenuOpen={isMenuOpen}
          />
        )}
      </View>
      <View>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    // background: 'transperent',
    backgroundColor: colors.headfoot,
    justifyContent: 'center',
    alignContent: 'center',
  },
  sideMenuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    width: 500,
    height: 1000,
  },
  headerButton: {
    padding: 10,
    backgroundColor: colors.headfootbutton,
    elevation: 10,
    borderRadius: 12,
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Header;
