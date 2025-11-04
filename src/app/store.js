import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@features/counter/counterSlice';
import authReducer from '@features/auth/authSlice';
import productsReducer from '@features/products/productsSlice';
import cartReducer from '@features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
