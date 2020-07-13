import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import { RootState } from '../../store';
import { removeFromCart, clearCart } from '../../store/cartSlice';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import { saveOrder } from '../../service/service';

const CartScreen = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) => Object.values(state.cart.items));
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [mutate, { isLoading, reset }] = useMutation(saveOrder, {
    onError: (error: Error) => {
      Alert.alert('An error occured!', error.message, [{ text: 'Okay', onPress: reset }]);
    },
    onSuccess: () => {
      dispatch(clearCart());
    },
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${(Math.round(totalAmount * 100) / 100).toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={() =>
              mutate({ cartItems, totalAmount, userId: authData.userId, token: authData.token })
            }
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            item={itemData.item}
            deletable
            onRemove={() => dispatch(removeFromCart(itemData.item.productId))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
