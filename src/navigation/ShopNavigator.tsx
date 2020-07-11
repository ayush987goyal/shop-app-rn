import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import ProductsStackScreen from './ProductStackScreen';
import OrdersStackScreen from './OrdersStackScreen';
import AdminStackScreen from './AdminStackScreen';

const ShopDrawer = createDrawerNavigator();

const ShopDrawerScreen = () => (
  <ShopDrawer.Navigator drawerContentOptions={{ activeTintColor: Colors.primary }}>
    <ShopDrawer.Screen
      name="Products"
      component={ProductsStackScreen}
      options={{
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
    />
    <ShopDrawer.Screen
      name="Orders"
      component={OrdersStackScreen}
      options={{
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
    />
    <ShopDrawer.Screen
      name="Admin"
      component={AdminStackScreen}
      options={{
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
    />
  </ShopDrawer.Navigator>
);

export default ShopDrawerScreen;
