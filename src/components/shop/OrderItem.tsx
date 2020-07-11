import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { format } from 'date-fns';

import { Order } from '../../models';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';
import Card from '../UI/Card';

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{format(order.date, 'MMMM do yyyy, hh:mm')}</Text>
      </View>

      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary}
        onPress={() => setShowDetails(curr => !curr)}
      />

      {showDetails && (
        <FlatList
          style={styles.detailItems}
          data={order.items}
          keyExtractor={item => item.productId}
          renderItem={itemData => <CartItem item={itemData.item} deletable={false} />}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
