import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  Platform,
  Button,
  Alert,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { queryCache } from 'react-query';
import { useDispatch } from 'react-redux';

import { AdminStackParamsList } from '../../navigation/AdminStackScreen';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Product } from '../../models';
import { useProducts, useRefetchOnFocus, FETCH_ALL_PRODUCTS_KEY } from '../../service/query-hooks';
import { deleteProduct } from '../../service/service';
import { deleteProductInCart } from '../../store/cartSlice';

interface UserProductsScreenProps {
  navigation: StackNavigationProp<AdminStackParamsList, 'UserProducts'> & DrawerNavigationProp<{}>;
}

const UserProductsScreen: React.FC<UserProductsScreenProps> = ({ navigation }) => {
  const { isLoading, isError, data: products, refetch } = useProducts('u1');
  useRefetchOnFocus(refetch);

  const dispath = useDispatch();

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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => navigation.navigate('EditProduct', {})}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const selectProductHandler = (product: Product) => {
    navigation.navigate('EditProduct', { product });
  };

  const deleteHandler = (productId: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          await deleteProduct(productId);
          dispath(deleteProductInCart(productId));
          await queryCache.invalidateQueries(FETCH_ALL_PRODUCTS_KEY);
        },
      },
    ]);
  };

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

  if (!products || !products.length) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem product={itemData.item} onSelect={() => selectProductHandler(itemData.item)}>
          <Button
            title="Edit"
            color={Colors.primary}
            onPress={() => selectProductHandler(itemData.item)}
          />
          <Button
            title="Delete"
            color={Colors.primary}
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
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

export default UserProductsScreen;
