/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { languageOptions } from '../devdata/constants/lang';

const LanguageSelectionComponent = ({
  selectedindex,
  setSelectedindex,
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = (value: number) => {
    setSelectedindex(value);
    setModalVisible(false);
  };
  const selectText = languageOptions[selectedindex].label;

  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 5, fontSize: 20 }}>{selectText}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          navigation.setParams({
            languageindex: selectedindex,
          });
        }}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text>Language Support Will Be Added Soon</Text>
            </TouchableOpacity>
            {/* {languageOptions.map(({ id }) => (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  handleLanguageChange(id);
                }}
              >
                <Text style={styles.label}>{languageOptions[id].label}</Text>
              </TouchableOpacity>
            ))} */}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
  },
});
export default LanguageSelectionComponent;
