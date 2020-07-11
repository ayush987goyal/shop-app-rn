import { StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};
