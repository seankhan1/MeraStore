import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer as categoriesReducer } from "./Slices/categories.slices";
import { reducer as userSlice } from './Slices/users.slices'
import { reducer as productsSlice } from './Slices/products.slices'
import { reducer as wishlistSlice } from './Slices/wishlist.slice'
import { reducer as cartSlice } from './Slices/cart.slice'
import { reducer as orderSlice } from './Slices/orders.slices';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        users: userSlice,
        products: productsSlice,
        wishlist: wishlistSlice,
        cart: cartSlice,
        orders: orderSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});

export default store;