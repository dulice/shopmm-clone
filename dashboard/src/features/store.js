import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import summaryApi from 'api/summaryApi';
import userSlice from "features/userSlice";
import userApi from 'api/userApi';

const store = configureStore({
    reducer: {
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
        [summaryApi.reducerPath]: summaryApi.reducer,
    },
    middleware: [thunk]
})

export default store;