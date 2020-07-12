import React from "react";

import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  margin,
  padding,
} from "../../helpers/style";

import Image from 'react-native-scalable-image';
import {
  FontAwesomeIcon
} from "@fortawesome/react-native-fontawesome";
import {
  faEllipsisH,
  faShareSquare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

interface OwnState {
  profilePictureWidth: number;
}

export class Comment extends React.Component<any, OwnState> {
  constructor(props: any) {
    super(props);

    this.state = {
      profilePictureWidth: 1,
    };
  }

  onProfilePictureLayout(event: LayoutChangeEvent) {
    this.setState({
      profilePictureWidth: event.nativeEvent.layout.width,
    });
  }

  render() {
    return (
      <View style={styles.comment}>
        <View style={styles.profilePictureContainer} onLayout={this.onProfilePictureLayout.bind(this)}>
          <Image width={this.state.profilePictureWidth} style={styles.profilePicture} source={{ uri:"https://bansheerubber.com/egg.png" }} />
        </View>
        <View style={styles.content}>
          <View style={styles.contentMeta}>
            <Text style={styles.username}>username</Text>
          </View>
          <View>
            <Text style={styles.body}>
              Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.
            </Text>
          </View>
          <View style={styles.commentOptions}>
            <Text>0</Text>
            <FontAwesomeIcon icon={ faThumbsUp } />
            <FontAwesomeIcon icon={ faShareSquare } />
            <FontAwesomeIcon icon={ faEllipsisH } />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  comment: {
    ...padding(5, 10, 10, 5),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profilePictureContainer: {
    ...margin(5, 13, 5, 5),
    flex: 1,
  },
  profilePicture: {
    borderRadius: 75 / 2,
  },
  content: {
    flex: 4,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginTop: 5,
  },
  username: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
  },
  body: {
    color: '#333',
    fontSize: 14,
  }
});
