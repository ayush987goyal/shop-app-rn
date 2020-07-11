import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { Product } from '../models';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';

const ProductsStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const AdminStack = createStackNavigator();
const ShopDrawer = createDrawerNavigator();

const defaultStackScreenOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackScreen = () => (
  <ProductsStack.Navigator screenOptions={defaultStackScreenOptions}>
    <ProductsStack.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={{ headerTitle: 'All Products' }}
    />
    <ProductsStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <ProductsStack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerTitle: 'Your Cart' }}
    />
  </ProductsStack.Navigator>
);

export type ProductsStackParamsList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

const OrdersStackScreen = () => (
  <OrdersStack.Navigator screenOptions={defaultStackScreenOptions}>
    <OrdersStack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ headerTitle: 'Your Orders' }}
    />
  </OrdersStack.Navigator>
);

export type OrdersStackParamsList = {
  Orders: undefined;
};

const AdminStackScreen = () => (
  <AdminStack.Navigator screenOptions={defaultStackScreenOptions}>
    <AdminStack.Screen
      name="UserProducts"
      component={UserProductsScreen}
      options={{ headerTitle: 'Your Products' }}
    />
  </AdminStack.Navigator>
);

export type AdminStackParamsList = {
  UserProducts: undefined;
};

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
