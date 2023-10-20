import {
  // AppOpenAd,
  // InterstitialAd,
  // RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize, // Import BannerAdSize
} from 'react-native-google-mobile-ads';

import { View } from 'react-native';
import React from 'react';

const Adsfullscreen = () => {
  return (
    <View>
      <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
    </View>
  );
};

export default Adsfullscreen;
