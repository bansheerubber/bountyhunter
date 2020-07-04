import React from "react";
import {
  Callout
} from "react-native-maps";
import {
  Text, View
} from "react-native";

interface OwnProps {
  title: string;
}

export class MarkerCallout extends React.Component<OwnProps> {
  render() {
    return (
      <Callout tooltip>
        <View style={{
            width: 140,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            backgroundColor: '#FFF',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 6,
            marginBottom: 7,
        }}>
          <Text>{this.props.title}</Text>
        </View>
      </Callout>
    );
  }
}
