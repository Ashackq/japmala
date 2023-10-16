import {
  // AppOpenAd,
  // InterstitialAd,
  // RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize, // Import BannerAdSize
} from 'react-native-google-mobile-ads';

import { StyleSheet, View } from 'react-native';
import React from 'react';

const Adsfullscreen = () => {
  return (
    <View style={styles.container}>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
    </View>
  );
};

export default Adsfullscreen;

const styles = StyleSheet.create({
  container: {
    top: 50,
  },
});
