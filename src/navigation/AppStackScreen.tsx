import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import ShopDrawerScreen from './ShopDrawerScreen';
import AuthStackScreen from './AuthStackScreen';
import { RootState } from '../store';

const AppStack = createStackNavigator();

const AppStackScreen = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.userId);

  return (
    <AppStack.Navigator headerMode="none">
      {isLoggedIn ? (
        <AppStack.Screen name="ShopStack" component={ShopDrawerScreen} />
      ) : (
        <AppStack.Screen name="AuthStack" component={AuthStackScreen} />
      )}
    </AppStack.Navigator>
  );
};

export type AppStackParamsList = {
  AuthStack: undefined;
  ShopStack: undefined;
};

export default AppStackScreen;
