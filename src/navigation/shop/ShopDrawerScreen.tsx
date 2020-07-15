import React from 'react';
import { Platform } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import ProductsStackScreen from './ProductStackScreen';
import OrdersStackScreen from './OrdersStackScreen';
import AdminStackScreen from './AdminStackScreen';
import { clearAuthData } from '../store/authSlice';

const ShopDrawer = createDrawerNavigator();

const ShopDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
            size={23}
            color={drawerConfig.color}
          />
        )}
        onPress={() => dispatch(clearAuthData())}
      />
    </DrawerContentScrollView>
  );
};

const ShopDrawerScreen = () => (
  <ShopDrawer.Navigator
    drawerContentOptions={{ activeTintColor: Colors.primary }}
    drawerContent={props => <ShopDrawerContent {...props} />}
  >
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
