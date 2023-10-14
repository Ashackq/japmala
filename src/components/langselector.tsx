/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { languageOptions } from '../devdata/constants/lang';

const LanguageSelectionComponent = ({ selectedindex, setSelectedindex }) => {
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
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            {languageOptions.map(({ id }) => (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  handleLanguageChange(id);
                }}
              >
                <Text>{languageOptions[id].label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LanguageSelectionComponent;
