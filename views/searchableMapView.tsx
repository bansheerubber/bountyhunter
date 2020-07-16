import Geolocation, {
  GeoError
} from 'react-native-geolocation-service';
import React from 'react';
import {
  Dimensions,
  EmitterSubscription,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MapView, {
  Marker,
  Region,
} from 'react-native-maps';

import {
  CurrentPosition
} from './components/currentPosition';
import {
  getLocationPermissions
} from '../helpers/locationPermission';
import {
  RadarAnimation
} from './components/radarAnimation';
import {
  padding
} from '../helpers/style';

interface OwnState {
  searchText: string;
  mapPaddingFix: {
    height: string;
  };
  latitude: number;
  longitude: number;
  region: Region;
}

export class SearchableMapView extends React.Component<any, OwnState> {
  private readonly search: React.RefObject<TextInput>;
  private keyboardWillHideListener?: EmitterSubscription;
  private watchId: number | undefined = undefined;

  constructor(props: any) {
    super(props);
    this.search = React.createRef();

    this.state = {
      searchText: '',
      mapPaddingFix: {
        height: '100%',
      },
      latitude: 0,
      longitude: 0,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.blurSearch.bind(this));
  }

  componentWillUnmount() {
    this.keyboardWillHideListener?.remove();

    if(this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }
  }

  blurSearch() {
    if(this.search.current) {
      this.search.current.blur();
    }
  }

  onSearchChange(text: string) {
    if(text !== null) {
      this.setState({
        searchText: text,
      });
    }
  }

  // jiggle the height of the map b/c mapPadding is broken on android and this is how you fix it
  onMapReady() {
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

    getLocationPermissions().then(() => {
      Geolocation.getCurrentPosition(
        (position) => this.setLocation(position, true),
        (error: GeoError) => { console.error(error) },
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, }
      );

      this.watchId = Geolocation.watchPosition(
        (position) => this.setLocation(position),
        (error: GeoError) => { console.error(error); },
        { enableHighAccuracy: true, interval: 60000, }
      );
    });
  }

  setLocation(
    position: {
      coords: {
        latitude: number;
        longitude: number;
      };
    },
    updateRegion: boolean = false
  ) {
    if(updateRegion) {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        },
      });
    }
    else {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }
  }

  onRegionChange(region: Region) {
    // note: don't set the region state in here, makes the map lag
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
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
          >
            <CurrentPosition latitude={this.state.latitude} longitude={this.state.longitude} />
            <RadarAnimation size={Dimensions.get('window').width - 20} latitude={this.state.latitude} longitude={this.state.longitude} />
          </MapView>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            ref={this.search}
            value={this.state.searchText}
            onChangeText={this.onSearchChange.bind(this)}
            placeholder={'Search'}
            style={styles.search}
          />
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
    shadowOpacity: 1,
    elevation: 25,
  },
});
