import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import Colors from '../constants/Colors';

const StartupScreen = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartupScreen;
