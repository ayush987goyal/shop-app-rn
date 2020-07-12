import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultStackScreenOptions } from './helper';
import AuthScreen from '../screens/user/AuthScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={defaultStackScreenOptions}>
    <AuthStack.Screen
      name="Auth"
      component={AuthScreen}
      options={{ headerTitle: 'Authenticate' }}
    />
  </AuthStack.Navigator>
);

export type AuthStackParamsList = {
  Auth: undefined;
};

export default AuthStackScreen;
