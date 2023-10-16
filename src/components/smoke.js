import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const SmokeEffect = () => {
  const smokeAnim = useRef(new Animated.Value(0)).current;

  const startSmokeAnimation = () => {
    smokeAnim.setValue(0);

    Animated.timing(smokeAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(() => {
      startSmokeAnimation();
    });
  };

  useEffect(() => {
    startSmokeAnimation();
  }, [smokeAnim, startSmokeAnimation]);

  return (
    <Animated.View
      style={[
        styles.smokeEffect,
        {
          opacity: smokeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.3],
          }),
          transform: [
            {
              translateY: smokeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0],
              }),
            },
            {
              scale: smokeAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 1.2, 1],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.smoke, styles.smoke1]} />
      <View style={[styles.smoke, styles.smoke2]} />
      <View style={[styles.smoke, styles.smoke3]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  smokeEffect: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    zIndex: 600,
  },
  smoke: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(200, 200, 200, 0.8)',
    borderRadius: 10,
    position: 'absolute',
  },
  smoke1: {
    marginLeft: 30,
  },
  smoke2: {
    marginLeft: 60,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  smoke3: {
    marginLeft: 90,
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
});

export default SmokeEffect;
