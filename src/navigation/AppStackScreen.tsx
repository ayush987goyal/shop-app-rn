import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShopDrawerScreen from './ShopDrawerScreen';
import AuthStackScreen from './AuthStackScreen';

interface AppStackScreenProps {
  isLoggedIn: boolean;
}

const AppStack = createStackNavigator();

const AppStackScreen: React.FC<AppStackScreenProps> = ({ isLoggedIn }) => (
  <AppStack.Navigator headerMode="none">
    {isLoggedIn ? (
      <AppStack.Screen name="ShopStack" component={ShopDrawerScreen} />
    ) : (
      <AppStack.Screen name="AuthStack" component={AuthStackScreen} />
    )}
  </AppStack.Navigator>
);

export type AppStackParamsList = {
  AuthStack: undefined;
  ShopStack: undefined;
};

export default AppStackScreen;
