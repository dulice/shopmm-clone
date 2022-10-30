import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "../api/userApi";
import thunk from "redux-thunk";
import productApi from "../api/productApi";
import cartProductSlice from "./cartProductSlice";
import orderApi from "../api/orderApi";

const store = configureStore({
    reducer: {
        user: userSlice,
        cartItems: cartProductSlice,
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: [thunk, userApi.middleware]
})

export default store;