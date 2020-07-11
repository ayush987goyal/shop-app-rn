import React, { useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, Image, Text, Button, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { addToCart } from '../../store/cartSlice';
import { ProductsStackParamsList } from '../../navigation/ProductStackScreen';

interface ProductDetailScreenProps {
  navigation: StackNavigationProp<ProductsStackParamsList, 'ProductDetail'>;
  route: RouteProp<ProductsStackParamsList, 'ProductDetail'>;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
  const { product: selectedProduct } = route.params;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedProduct.title,
    });
  }, [navigation, selectedProduct.title]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />

      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          color={Colors.primary}
          onPress={() => dispatch(addToCart({ product: selectedProduct }))}
        />
      </View>

      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
