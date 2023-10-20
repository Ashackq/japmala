import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Head } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { lang } from '../devdata/constants/languages';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Tnc'>;

const AppPolicy = ({ navigation, route }: HomeProps) => {
  const i = route.params.languageindex;

  return (
    <View style={styles.container}>
      <Head
        ishome={false}
        name={lang[i].tnc}
        navigation={navigation}
        route={route}
      />
      <ScrollView contentContainerStyle={styles.scontainer}>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            arcu nec velit pharetra malesuada. Vestibulum laoreet nisi quis
            tellus congue, vel venenatis libero efficitur. Sed tincidunt non
            libero at bibendum.
          </Text>
          <Text style={styles.contentText}>
            Vestibulum euismod, velit eget cursus facilisis, augue dolor
            suscipit purus, quis accumsan felis quam id dui. Proin in elit a
            nunc vulputate auctor. Duis et nibh a purus laoreet feugiat nec vel
            nulla.
          </Text>
          {/* Add more policy content as needed */}
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
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default AppPolicy;
