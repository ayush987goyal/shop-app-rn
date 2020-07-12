import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { queryCache, useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AdminStackParamsList } from '../../navigation/AdminStackScreen';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import { saveProduct, updateProduct } from '../../service/service';
import { FETCH_ALL_PRODUCTS_KEY } from '../../service/query-hooks';
import Colors from '../../constants/Colors';

interface ProductFormValues {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
}

const productSchema = yup.object<ProductFormValues>({
  title: yup.string().required('Title is required!'),
  imageUrl: yup.string().url('Please enter a valid url!').required('Image URL is required!'),
  price: yup.string().required('Price is required!'),
  description: yup.string().required('Description is required!'),
});

interface EditProductScreenProps {
  navigation: StackNavigationProp<AdminStackParamsList, 'EditProduct'>;
  route: RouteProp<AdminStackParamsList, 'EditProduct'>;
}

const EditProductScreen: React.FC<EditProductScreenProps> = ({ route, navigation }) => {
  const { product } = route.params;

  const mutationSuccessHandler = async () => {
    await queryCache.invalidateQueries(FETCH_ALL_PRODUCTS_KEY);
    navigation.goBack();
  };

  const mutationErrorHandler = (error: Error) => {
    Alert.alert('An error occured!', error.message, [
      {
        text: 'Okay',
        onPress: () => {
          resetUpdate();
          resetSave();
        },
      },
    ]);
  };

  const [updateProductMutate, { isLoading: isUpdateLoading, reset: resetUpdate }] = useMutation(
    updateProduct,
    {
      onSuccess: mutationSuccessHandler,
      onError: mutationErrorHandler,
    }
  );
  const [saveProductMutate, { isLoading: isSaveLoading, reset: resetSave }] = useMutation(
    saveProduct,
    {
      onSuccess: mutationSuccessHandler,
      onError: mutationErrorHandler,
    }
  );

  const { values, touched, errors, setFieldValue, setFieldTouched, handleSubmit } = useFormik<
    ProductFormValues
  >({
    initialValues: {
      title: product?.title || '',
      imageUrl: product?.imageUrl || '',
      price: product ? `${product.price}` : '',
      description: product?.description || '',
    },
    validationSchema: productSchema,
    onSubmit: fieldValues => {
      const { title, imageUrl, price, description } = fieldValues;

      if (product) {
        updateProductMutate({ id: product.id, title, imageUrl, description });
      } else {
        saveProductMutate({ price: +price, title, imageUrl, description, ownerId: 'u1' });
      }
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={handleSubmit}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, product, handleSubmit]);

  if (isUpdateLoading || isSaveLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Title"
          value={values.title}
          onChangeText={t => setFieldValue('title', t)}
          onBlur={() => setFieldTouched('title')}
          errorText={touched.title ? errors.title : undefined}
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
        />

        <Input
          label="Image URL"
          value={values.imageUrl}
          onChangeText={t => setFieldValue('imageUrl', t)}
          onBlur={() => setFieldTouched('imageUrl')}
          errorText={touched.imageUrl ? errors.imageUrl : undefined}
          returnKeyType="next"
        />

        {!product && (
          <Input
            label="Price"
            value={values.price}
            onChangeText={t => setFieldValue('price', t)}
            onBlur={() => setFieldTouched('price')}
            errorText={touched.price ? errors.price : undefined}
            returnKeyType="next"
            keyboardType="decimal-pad"
          />
        )}

        <Input
          label="Description"
          value={values.description}
          onChangeText={t => setFieldValue('description', t)}
          onBlur={() => setFieldTouched('description')}
          errorText={touched.description ? errors.description : undefined}
          returnKeyType="next"
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProductScreen;
