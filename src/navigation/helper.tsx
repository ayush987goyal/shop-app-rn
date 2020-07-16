import { Platform } from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

import Colors from '../constants/Colors';

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

export type ScreenProps<T extends Record<string, object | undefined>, K extends keyof T> = {
  navigation: StackNavigationProp<T, K> & DrawerNavigationProp<{}>;
  route: RouteProp<T, K>;
};
