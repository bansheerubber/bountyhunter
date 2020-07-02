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
  SearchableMapView
} from './views/searchableMapView';

const App: () => React$Node = () => {
  return <SearchableMapView />;
};

export default App;
