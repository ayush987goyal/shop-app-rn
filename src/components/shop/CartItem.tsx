import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CartUnit } from '../../models';

interface CartItemProps {
  item: CartUnit;
  deletable: boolean;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, deletable, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{item.quantity} </Text>
        <Text style={styles.mainText}>{item.productTitle}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.mainText}>${item.sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity style={styles.deleteBtn} onPress={onRemove}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteBtn: {
    marginLeft: 20,
  },
});

export default CartItem;
