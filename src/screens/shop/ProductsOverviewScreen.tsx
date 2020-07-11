import React, { useLayoutEffect } from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store';
import { Product } from '../../models';
import { ProductsStackParamsList } from '../../navigation/ProductStackScreen';
import { addToCart } from '../../store/cartSlice';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

interface ProductsOverviewScreenProps {
  navigation: StackNavigationProp<ProductsStackParamsList, 'ProductsOverview'> &
    DrawerNavigationProp<{}>;
}

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.availableProducts);

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

  return (
    <FlatList
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

export default ProductsOverviewScreen;
