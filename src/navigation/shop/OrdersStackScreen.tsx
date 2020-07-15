import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultStackScreenOptions } from '../helper';
import OrdersScreen from '../../screens/shop/OrdersScreen';

const OrdersStack = createStackNavigator();

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

export default OrdersStackScreen;
