import React from 'react';

import {
  Dimensions,
  Keyboard,
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
} from '../helpers/style';

export class SearchableMapView extends React.Component {
  constructor(props) {
    super(props);
    this.search = React.createRef();

    this.state = {
      searchText: '',
      mapPaddingFix: {
        height: '100%',
      },
    };
  }

  componentDidMount() {
    this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.blurSearch.bind(this));
  }

  componentWillUnmount() {
    this.keyboardWillHideListener.remove();
  }

  blurSearch(event) {
    if(this.search.current) {
      this.search.current.blur();
    }
  }

  onSearchChange(text) {
    if(text !== null) {
      this.setState({
        searchText: text,
      });
    }
  }

  // jiggle the height of the map b/c mapPadding is broken on android and this is how you fix it
  onMapReady(event) {
    this.setState({
      mapPaddingFix: {
        height: '99.9%',
      },
    });

    setTimeout(() => {
      this.setState({
        mapPaddingFix: {
          height: '100%',
        },
      });
    }, 100);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            mapPadding={{
              left: 0,
              right: 0,
              top: 75,
              bottom: 0,
            }}
            onMapReady={this.onMapReady.bind(this)}
            onPress={this.blurSearch.bind(this)}
            style={[styles.map, this.state.mapPaddingFix]}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput ref={this.search} value={this.state.searchText} onChange={this.onSearchChange.bind(this)} placeholder={'Search'} style={styles.search} />
        </View>
      </View>
    );
  }
}

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
    left:
      Dimensions.get('window').width / 2 -
      (Dimensions.get('window').width * 0.9) / 2,
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
