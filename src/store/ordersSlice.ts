import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartUnit, Order } from '../models';

interface AddOrderPayload {
  cartItems: CartUnit[];
  totalAmount: number;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<AddOrderPayload>) => {
      const { cartItems, totalAmount } = action.payload;

      state.orders.push({
        id: Date.now().toString(),
        items: cartItems,
        totalAmount,
        date: new Date(),
      });
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
