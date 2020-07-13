import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { setAuthData } from '../store/authSlice';
import StartupScreen from '../screens/StartupScreen';
import ShopDrawerScreen from './ShopDrawerScreen';
import AuthStackScreen from './AuthStackScreen';

const AppStack = createStackNavigator();

const AppStackScreen = () => {
  const [tryingAutologin, setTryingAutologin] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const authData = await AsyncStorage.getItem('authData');

      if (authData) {
        const { token, userId, expiryDate } = JSON.parse(authData);
        const expirationDate = new Date(expiryDate);

        if (token && userId && expirationDate > new Date()) {
          dispatch(
            setAuthData({
              token,
              userId,
              expiresIn: (expirationDate.getTime() - new Date().getTime()) / 1000,
            })
          );
        }
      }

      setTryingAutologin(false);
    };

    tryLogin();
  }, [dispatch]);

  return (
    <AppStack.Navigator headerMode="none">
      {tryingAutologin && <AppStack.Screen name="Startup" component={StartupScreen} />}

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
