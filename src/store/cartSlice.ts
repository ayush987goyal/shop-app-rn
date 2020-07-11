import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem, Product } from '../models';

interface AddToCartPayload {
  product: Product;
}

interface CartState {
  items: Record<string, CartItem>;
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
