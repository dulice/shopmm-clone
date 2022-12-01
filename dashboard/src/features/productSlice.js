import { createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productApi';

const productSlice = createSlice({
    name: 'Products',
    initialState: {
        products: [],
    },
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(productApi.endpoints.getProduct.matchFulfilled, (state, action) => action.payload);
        builder.addMatcher(productApi.endpoints.getProducts.matchFulfilled, (state, action) => action.payload);
    }
})

export const { getProducts } = productSlice.actions;
export default productSlice.reducer;