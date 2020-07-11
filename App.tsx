import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </Provider>
  );
}
