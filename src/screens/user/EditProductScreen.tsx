import React, { useLayoutEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import { AdminStackParamsList } from '../../navigation/ShopNavigator';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { createProduct, updateProduct } from '../../store/productsSlice';

interface EditProductScreenProps {
  navigation: StackNavigationProp<AdminStackParamsList, 'EditProduct'>;
  route: RouteProp<AdminStackParamsList, 'EditProduct'>;
}

const EditProductScreen: React.FC<EditProductScreenProps> = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const [title, setTitle] = useState(product?.title || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(product?.description || '');

  const submitHandler = useCallback(() => {
    if (product) {
      dispatch(
        updateProduct({
          id: product.id,
          title,
          imageUrl,
          description,
        })
      );
    } else {
      dispatch(createProduct({ price: parseFloat(price), title, imageUrl, description }));
    }
  }, [dispatch, product, description, imageUrl, price, title]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, product, submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.control}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={t => setTitle(t)} />
        </View>

        <View style={styles.control}>
          <Text style={styles.label}>Image URl</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={t => setImageUrl(t)} />
        </View>

        {!product && (
          <View style={styles.control}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={t => setPrice(t)} />
          </View>
        )}

        <View style={styles.control}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={t => setDescription(t)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  control: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
