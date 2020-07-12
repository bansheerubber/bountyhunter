import React from "react";
import {
  Animated,
  View,
} from 'react-native';
import {
  Marker
} from "react-native-maps";

interface OwnProps {
  latitude: number,
  longitude: number,
  size: number
}

interface OwnState {
  animatedValue: Animated.Value
}

export class RadarAnimation extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }).start();
    }, 5000);
  }

  render() {
    return (
      <Marker
        coordinate={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
        }}
        anchor={{
          x: 0.5,
          y: 0.5,
        }}
      >
        <View style={{
          width: this.props.size,
          height: this.props.size,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Animated.View style={{
            borderWidth: this.state.animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, this.props.size / 2, 0],
            }),
            borderColor: '#21bcff',
            borderRadius: 10000,
            width: this.state.animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, this.props.size, this.props.size],
            }),
            height: this.state.animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, this.props.size, this.props.size],
            }),
          }} />
        </View>
      </Marker>
    );
  }
}
