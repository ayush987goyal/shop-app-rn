import React, { useLayoutEffect } from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store';
import { OrdersStackParamsList } from '../../navigation/ShopNavigator';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

interface OrdersScreenProps {
  navigation: StackNavigationProp<OrdersStackParamsList, 'Orders'> & DrawerNavigationProp<{}>;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

export default OrdersScreen;
