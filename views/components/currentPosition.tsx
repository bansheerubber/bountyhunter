import React from "react";
import {StyleSheet, View} from "react-native";
import {MarkerCallout} from "./markerCallout";
import {Marker} from "react-native-maps";

interface OwnProps {
  latitude: number,
  longitude: number,
}

export class CurrentPosition extends React.Component<OwnProps> {
  render() {
    return <Marker
      coordinate={{
        latitude: this.props.latitude,
        longitude: this.props.longitude,
      }}
      title={'Current Location'}
      style={{
        zIndex: 1000,
      }}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
    >
      <View style={{
        width: 18,
        height: 18,
        borderRadius: 18 / 2,
        borderColor: '#FFF',
        borderWidth: 2,
        backgroundColor: '#21bcff',
        shadowColor: '#000',
        shadowOpacity: 1,
        elevation: 15,
      }} />
      <MarkerCallout title={'Your Location'} />
    </Marker>
  }
}
