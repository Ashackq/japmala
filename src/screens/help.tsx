import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Head } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Help'>;

const Help = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* <Image source={Editback} style={styles.img} /> */}
      <Head
        ishome={false}
        name={lang[i].help}
        navigation={navigation}
        route={route}
      />
      <ScrollView contentContainerStyle={styles.scontainer}>
        <View style={styles.content}>
          <Text style={styles.header}>{lang[i].helphead}</Text>

          <Text style={styles.paragraph}>{lang[i].para1}</Text>

          <Text style={styles.paragraph}>{lang[i].para2}</Text>

          <Text style={styles.paragraph}>{lang[i].para3}</Text>

          <Text style={styles.paragraph}>{lang[i].para4}</Text>

          <Text style={styles.paragraph}>{lang[i].para5}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scontainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 20,
    marginBottom: 10,
  },
  img: {
    position: 'absolute',
    bottom: 20,
    width: 440,
    height: 900,
  },
});

export default Help;
