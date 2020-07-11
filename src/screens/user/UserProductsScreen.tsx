import React, { useLayoutEffect } from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store';
import { AdminStackParamsList } from '../../navigation/ShopNavigator';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

interface UserProductsScreenProps {
  navigation: StackNavigationProp<AdminStackParamsList, 'UserProducts'> & DrawerNavigationProp<{}>;
}

const UserProductsScreen: React.FC<UserProductsScreenProps> = ({ navigation }) => {
  const products = useSelector((state: RootState) => state.products.userProducts);

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
    });
  }, [navigation]);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem product={itemData.item} onSelect={() => {}}>
          <Button title="Edit" color={Colors.primary} onPress={() => {}} />
          <Button title="Delete" color={Colors.primary} onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
