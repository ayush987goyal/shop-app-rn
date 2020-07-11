import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { removeFromCart, clearCart } from '../../store/cartSlice';
import { addOrder } from '../../store/ordersSlice';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) => Object.values(state.cart.items));
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder({ cartItems, totalAmount }));
            dispatch(clearCart());
          }}
        />
      </View>

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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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
