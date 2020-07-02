/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  View,
} from 'react-native';

import MapView from 'react-native-maps';
import {
  padding
} from './helpers/style';

const App: () => React$Node = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        <View style={styles.searchContainer}>
          <TextInput placeholder={'Search'} style={styles.search} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    position: 'absolute',
    top: 25,
    left: (Dimensions.get('window').width / 2) - (Dimensions.get('window').width * 0.9 / 2),
    width: '90%',
    height: 50,
    zIndex: 5,
  },
  search: {
    ...padding(10, 15, 10, 15),
    backgroundColor: '#FFF',
    color: '#333',
    fontSize: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.58,
    elevation: 5,
  },
});

export default App;
