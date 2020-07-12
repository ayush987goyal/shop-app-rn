import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { setConsole, ReactQueryConfigProvider } from 'react-query';
import * as Font from 'expo-font';

import store from './src/store';
import ShopNavigator from './src/navigation/ShopNavigator';

setConsole({
  log: console.log,
  warn: console.log,
  error: console.log,
});

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ReactQueryConfigProvider config={{ queries: { retry: false } }}>
          <ShopNavigator />
        </ReactQueryConfigProvider>
      </NavigationContainer>
    </Provider>
  );
}
