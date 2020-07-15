import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Product } from '../../models';
import { defaultStackScreenOptions } from '../helper';
import ProductsOverviewScreen from '../../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import CartScreen from '../../screens/shop/CartScreen';

const ProductsStack = createStackNavigator();

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

export default ProductsStackScreen;
