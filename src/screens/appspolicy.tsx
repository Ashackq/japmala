import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Head } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages12';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Tnc'>;

const AppPolicy = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Head name={lang[i].appshead} navigation={navigation} route={route} />
      </View>
      <ScrollView contentContainerStyle={styles.scontainer}>
        <View style={styles.content}>
          <Text style={styles.paragraph}>{lang[i].appspara1}</Text>

          <Text style={styles.paragraph}>{lang[i].appspare2}</Text>

          <Text style={styles.paragraph}>{lang[i].appspare3}</Text>

          <Text style={styles.paragraph}>{lang[i].appspara4}</Text>

          <Text style={styles.paragraph}>{lang[i].appspara5}</Text>

          <Text style={styles.paragraph}>{lang[i].appspara6}</Text>

          <Text style={styles.paragraph}>{lang[i].appspara7}</Text>

          <Text style={styles.paragraph}>{lang[i].appspara8}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  scontainer: {
    marginHorizontal: 15,
    marginTop: 80,
  },

  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 80,
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
  head: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
});

export default AppPolicy;
