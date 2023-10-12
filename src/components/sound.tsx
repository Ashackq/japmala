import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const SoundComponent = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load the audio file
    const soundObject = new Sound('om.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
      }
    });

    setSound(soundObject);

    // Release the audio resource when the component unmounts
    return () => {
      if (soundObject) {
        soundObject.release();
      }
    };
  }, []);

  const playSound = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause(() => {
          console.log('Sound paused');
        });
      } else {
        sound.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Failed to play the sound');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={playSound}
        style={{ backgroundColor: 'white' }}
      >
        <Text>{isPlaying ? 'Pause Sound' : 'Play Sound'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SoundComponent;
