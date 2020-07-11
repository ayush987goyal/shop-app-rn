import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
