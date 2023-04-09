import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userSlice from "./userSlice";
import cartProductSlice from "./cartProductSlice";
import userApi from "../api/userApi";
import productApi from "../api/productApi";
import orderApi from "../api/orderApi";

const store = configureStore({
    reducer: {
        user: userSlice,
        cartItems: cartProductSlice,
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(thunk, userApi.middleware, productApi.middleware, orderApi.middleware),    
})

export default store;