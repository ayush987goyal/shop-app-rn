import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
});

export default productsSlice.reducer;
