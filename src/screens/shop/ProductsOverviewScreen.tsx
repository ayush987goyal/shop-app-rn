import React, { useLayoutEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store';
import { ProductsStackParamsList } from '../../navigation/ShopNavigator';
import { addToCart } from '../../store/cartSlice';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

interface ProductsOverviewScreenProps {
  navigation: StackNavigationProp<ProductsStackParamsList, 'ProductsOverview'>;
}

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.availableProducts);

  useLayoutEffect(() => {
    navigation.setOptions({
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

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() => navigation.navigate('ProductDetail', { product: itemData.item })}
          onAddToCart={() => dispatch(addToCart({ product: itemData.item }))}
        />
      )}
    />
  );
};

export default ProductsOverviewScreen;
