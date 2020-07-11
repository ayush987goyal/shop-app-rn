import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Product } from '../models';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductsStack = createStackNavigator();

const ProductsStackScreen = () => (
  <ProductsStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
      headerTitleStyle: { fontFamily: 'open-sans-bold' },
      headerBackTitleStyle: { fontFamily: 'open-sans' },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }}
  >
    <ProductsStack.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={{ headerTitle: 'All Products' }}
    />
    <ProductsStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <ProductsStack.Screen name="Cart" component={CartScreen} />
  </ProductsStack.Navigator>
);

export type ProductsStackParamsList = {
  ProductsOverview: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
};

export default ProductsStackScreen;
