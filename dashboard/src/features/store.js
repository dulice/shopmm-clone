import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userSlice from "features/userSlice";
import productSlice from "features/productSlice";
import summaryApi from 'api/summaryApi';
import userApi from 'api/userApi';
import productApi from "api/productApi";

const store = configureStore({
    reducer: {
        user: userSlice,
        products: productSlice,
        [userApi.reducerPath]: userApi.reducer,
        [summaryApi.reducerPath]: summaryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: [thunk, userApi.middleware, summaryApi.middleware, productApi.middleware],
    devTools: false,
})

export default store;