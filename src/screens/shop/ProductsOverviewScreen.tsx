import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState } from '../../store';
import { ProductsStackParamsList } from '../../navigation/ShopNavigator';
import { addToCart } from '../../store/cartSlice';
import ProductItem from '../../components/shop/ProductItem';

interface ProductsOverviewScreenProps {
  navigation: StackNavigationProp<ProductsStackParamsList, 'ProductsOverview'>;
}

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.availableProducts);

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
