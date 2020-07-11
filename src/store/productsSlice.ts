import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../models';
import { PRODUCTS } from '../data/dummy-data';

interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.ownerId === 'u1'),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      state.userProducts = state.userProducts.filter(p => p.id !== productId);
      state.availableProducts = state.availableProducts.filter(p => p.id !== productId);
    },
  },
});

export const { deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
