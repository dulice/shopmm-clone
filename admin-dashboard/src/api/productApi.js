import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL + '/products';
const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl }),
    tagTypes: ['products', 'product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/'
            }),
            providesTags: ['products'],
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['products'],
        }),       
        updateProduct: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['product']
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `/${id}`,
            }),
            providesTags: ['product']
        }),
        getMyProducts: builder.query({
            query: (ownerId) => ({
                url: `/owner/${ownerId}`
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products']
        })
    })
})

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useGetProductQuery, useGetMyProductsQuery, useDeleteProductMutation } = productApi;
export default productApi; 