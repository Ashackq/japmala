import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

const Share = require('../assets/share.png');
const Info = require('../assets/info.jpg');

const Header = ({ ishome, name }) => {
  const handleSharePress = async () => {
    const playStoreUrl =
      'https://play.google.com/store/apps/details?id=your.package.name';
    const appstoreurl =
      'https://apps.apple.com/sg/app/japa-mala/id984477920?platform=ipad';

    if (Platform.OS === 'android') {
      Linking.openURL(playStoreUrl);
    } else {
      Linking.openURL(appstoreurl);
    }
  };

  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const handleInfoPress = () => {
    console.log('Info button pressed.');
    setIsInfoModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {ishome && (
          <TouchableOpacity
            onPress={handleSharePress}
            style={styles.headerButton}
          >
            <Image source={Share} style={styles.icon} />
          </TouchableOpacity>
        )}

        <Text style={styles.headerTitle}>{name}</Text>

        {ishome && (
          <TouchableOpacity
            onPress={handleInfoPress}
            style={styles.headerButton}
          >
            <Image source={Info} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Modal transparent visible={isInfoModalVisible} animationType="slide">
          <CustomAlertDialog
            name={name}
            closeModal={() => setIsInfoModalVisible(false)}
          />
        </Modal>
      </View>
    </View>
  );
};

const CustomAlertDialog = ({ name, closeModal }) => {
  const handleWebAppsPress = () => {
    const url = 'http://www.abcom.com/iosapps.html';
    const andyurl = 'http://www.abcom.com/androidapps.html';

    if (Platform.OS === 'android') {
      Linking.openURL(andyurl);
    } else {
      Linking.openURL(url);
    }
  };
  const handlemorePress = () => {
    const andyurl =
      'https://play.google.com/store/apps/developer?id=ABCOM&hl=en&gl=US';
    const url = 'https://apps.apple.com/sg/developer/abcom/id327443601';
    if (Platform.OS === 'android') {
      Linking.openURL(andyurl);
    } else {
      Linking.openURL(url);
    }
  };
  return (
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>{name}</Text>
      <Text style={styles.alertVersion}>(Version 1.4.1)</Text>

      <Text style={styles.alertContent}>
        {'\n'}
        Copyright@2015-21
        {'\n'}
        ABCOM Information Systems Pvt Ltd
      </Text>

      <View style={styles.alertButtonContainer}>
        <TouchableOpacity
          onPress={handleWebAppsPress}
          style={styles.alertButton}
        >
          <Text style={{ color: 'red' }}>Web Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlemorePress} style={styles.alertButton}>
          <Text style={{ color: 'red' }}>More</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={closeModal} style={styles.alertButton}>
        <Text style={{ color: 'blue' }}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#8f1c44',
    top: 0,
    position: 'absolute',
  },
  headerButton: {
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    height: 25,
    width: 25,
    marginHorizontal: 100,
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    marginTop: '50%',
    alignSelf: 'center',
  },
  alertTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  alertVersion: {
    textAlign: 'center',
    marginTop: -5,
    fontSize: 12,
  },
  alertDivider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  alertContent: {
    textAlign: 'center',
  },
  alertButtonContainer: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    marginTop: 10,
  },
  alertButton: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertButtonDivider: {
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
});

export default Header;
