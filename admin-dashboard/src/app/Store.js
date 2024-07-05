import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import userApi from "../api/userApi";
import summaryApi from "../api/summaryApi";
import productApi from "../api/productApi";

const store = configureStore({
    reducer: {
        toggle: toggleSlice,
        user: userSlice,
        products: productSlice,
        [userApi.reducerPath]: userApi.reducer,
        [summaryApi.reducerPath]: summaryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, summaryApi.middleware, productApi.middleware),
})

export default store;