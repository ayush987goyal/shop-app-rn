import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ProductsStackParamsList } from '../../navigation/ShopNavigator';

interface ProductDetailScreenProps {
  navigation: StackNavigationProp<ProductsStackParamsList, 'ProductDetail'>;
  route: RouteProp<ProductsStackParamsList, 'ProductDetail'>;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
  const { product: selectedProduct } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedProduct.title,
    });
  }, [navigation, selectedProduct.title]);

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
      <Text>{selectedProduct.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
