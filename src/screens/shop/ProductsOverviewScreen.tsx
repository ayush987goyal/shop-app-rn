import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Product } from '../../models';
import { ProductsStackParamsList } from '../../navigation/ProductStackScreen';
import { addToCart } from '../../store/cartSlice';
import { useProducts, useRefetchOnFocus } from '../../service/query-hooks';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

interface ProductsOverviewScreenProps {
  navigation: StackNavigationProp<ProductsStackParamsList, 'ProductsOverview'> &
    DrawerNavigationProp<{}>;
}

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { isLoading, isError, isFetching, data: products, refetch } = useProducts(null);
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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => navigation.navigate('Cart')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const selectItemHandler = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
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
      onRefresh={refetch}
      refreshing={isFetching}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem product={itemData.item} onSelect={() => selectItemHandler(itemData.item)}>
          <Button
            title="View Details"
            color={Colors.primary}
            onPress={() => selectItemHandler(itemData.item)}
          />
          <Button
            title="To Cart"
            color={Colors.primary}
            onPress={() => dispatch(addToCart({ product: itemData.item }))}
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

export default ProductsOverviewScreen;
