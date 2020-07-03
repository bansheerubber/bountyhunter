/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  padding
} from './helpers/style';
import {
  CommentsView
} from './views/commentsView';

const App: () => React$Node = () => {
  return <CommentsView />;
};

export default App;
