import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultStackScreenOptions } from '../helper';
import OrdersScreen from '../../screens/shop/OrdersScreen';

export type OrdersStackParamsList = {
  Orders: undefined;
};

const OrdersStack = createStackNavigator<OrdersStackParamsList>();

const OrdersStackScreen = () => (
  <OrdersStack.Navigator screenOptions={defaultStackScreenOptions}>
    <OrdersStack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ headerTitle: 'Your Orders' }}
    />
  </OrdersStack.Navigator>
);

export default OrdersStackScreen;
