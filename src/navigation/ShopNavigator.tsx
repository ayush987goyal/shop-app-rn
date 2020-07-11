import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { Platform } from 'react-native';

const ProductsStack = createStackNavigator();

const ProductsStackScreen = () => (
  <ProductsStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }}
  >
    <ProductsStack.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={{ headerTitle: 'All Products' }}
    />
  </ProductsStack.Navigator>
);

export default ProductsStackScreen;
