import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  Platform,
  View,
  ActivityIndicator,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { OrdersStackParamsList } from '../../navigation/OrdersStackScreen';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { useOrders, useRefetchOnFocus } from '../../service/query-hooks';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootState } from '../../store';

interface OrdersScreenProps {
  navigation: StackNavigationProp<OrdersStackParamsList, 'Orders'> & DrawerNavigationProp<{}>;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { isLoading, isError, isFetching, data: orders, refetch } = useOrders(userId);
  useRefetchOnFocus(refetch);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try Again" onPress={() => refetch()} />
      </View>
    );
  }

  if (!orders || !orders.length) {
    return (
      <View style={styles.centered}>
        <Text>No orders found. Maybe start ordering!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={refetch}
      refreshing={isFetching}
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem order={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersScreen;
