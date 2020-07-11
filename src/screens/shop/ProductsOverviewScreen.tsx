import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = () => {
  const products = useSelector((state: RootState) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem product={itemData.item} onViewDetail={() => {}} onAddToCart={() => {}} />
      )}
    />
  );
};

export default ProductsOverviewScreen;
