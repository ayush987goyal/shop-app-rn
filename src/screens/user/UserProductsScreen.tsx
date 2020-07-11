import React, { useLayoutEffect } from 'react';
import { FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store';
import { AdminStackParamsList } from '../../navigation/ShopNavigator';
import { deleteProduct } from '../../store/productsSlice';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { Product } from '../../models';

interface UserProductsScreenProps {
  navigation: StackNavigationProp<AdminStackParamsList, 'UserProducts'> & DrawerNavigationProp<{}>;
}

const UserProductsScreen: React.FC<UserProductsScreenProps> = ({ navigation }) => {
  const products = useSelector((state: RootState) => state.products.userProducts);
  const dispatch = useDispatch();

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
        onPress: () => dispatch(deleteProduct(productId)),
      },
    ]);
  };

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

export default UserProductsScreen;
