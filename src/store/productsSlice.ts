import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../models';
import { PRODUCTS } from '../data/dummy-data';

type CreateProductPayload = Omit<Product, 'id' | 'ownerId'>;
type UpdateProductPayload = Omit<Product, 'price' | 'ownerId'>;

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
    createProduct: (state, action: PayloadAction<CreateProductPayload>) => {
      const newProduct: Product = {
        ...action.payload,
        ownerId: 'u1',
        id: new Date().toString(),
      };

      state.availableProducts.push(newProduct);
      state.userProducts.push(newProduct);
    },

    updateProduct: (state, action: PayloadAction<UpdateProductPayload>) => {
      const updatedProduct = action.payload;
      const userProdIndex = state.userProducts.findIndex(p => p.id === updatedProduct.id);
      const availableProdIndex = state.availableProducts.findIndex(p => p.id === updatedProduct.id);

      state.userProducts[userProdIndex] = {
        ...state.userProducts[userProdIndex],
        ...updatedProduct,
      };
      state.availableProducts[availableProdIndex] = {
        ...state.availableProducts[availableProdIndex],
        ...updatedProduct,
      };
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      state.userProducts = state.userProducts.filter(p => p.id !== productId);
      state.availableProducts = state.availableProducts.filter(p => p.id !== productId);
    },
  },
});

export const { createProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
