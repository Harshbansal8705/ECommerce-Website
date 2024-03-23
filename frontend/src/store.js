import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/product/productSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cart/cartSlice";
import orderSlice from "./features/order/orderSlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        auth: authSlice,
        cart: cartSlice,
        order: orderSlice
    }
})

export default store;