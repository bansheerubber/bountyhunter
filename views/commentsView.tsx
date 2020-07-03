import React from 'react';
import {
  ScrollView,
} from "react-native";

import {
  Comment,
} from './components/comment'

export class CommentsView extends React.Component<any> {
  render() {
    return (
      <ScrollView style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </ScrollView>
    );
  }
}
