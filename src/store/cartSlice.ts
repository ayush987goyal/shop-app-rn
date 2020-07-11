import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartUnit, Product } from '../models';
import { addOrder } from './ordersSlice';
import { deleteProduct } from './productsSlice';

interface AddToCartPayload {
  product: Product;
}

interface CartState {
  items: Record<string, CartUnit>;
  totalAmount: number;
}

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product } = action.payload;

      if (product.id in state.items) {
        state.items[product.id].quantity += 1;
        state.items[product.id].sum += product.price;
        state.items[product.id].productTitle = product.title;
      } else {
        state.items[product.id] = {
          quantity: 1,
          productId: product.id,
          productTitle: product.title,
          productPrice: product.price,
          sum: product.price,
        };
      }

      state.totalAmount += product.price;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const cartItem = state.items[productId];

      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        cartItem.sum -= cartItem.productPrice;
      } else {
        delete state.items[productId];
      }

      state.totalAmount -= cartItem.productPrice;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(addOrder, () => initialState)
      .addCase(deleteProduct, (state, action) => {
        const productId = action.payload;

        if (productId in state.items) {
          state.totalAmount -= state.items[productId].sum;
          delete state.items[productId];
        }
      }),
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
