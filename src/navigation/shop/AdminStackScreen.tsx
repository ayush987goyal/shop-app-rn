import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Product } from '../../models';
import { defaultStackScreenOptions } from '../helper';
import UserProductsScreen from '../../screens/user/UserProductsScreen';
import EditProductScreen from '../../screens/user/EditProductScreen';

export type AdminStackParamsList = {
  UserProducts: undefined;
  EditProduct: { product?: Product };
};

const AdminStack = createStackNavigator<AdminStackParamsList>();

const AdminStackScreen = () => (
  <AdminStack.Navigator screenOptions={defaultStackScreenOptions}>
    <AdminStack.Screen
      name="UserProducts"
      component={UserProductsScreen}
      options={{ headerTitle: 'Your Products' }}
    />
    <AdminStack.Screen name="EditProduct" component={EditProductScreen} />
  </AdminStack.Navigator>
);

export default AdminStackScreen;
