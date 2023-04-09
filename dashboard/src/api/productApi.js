import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "/products"}),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/'
            }),
            providesTags: ['products'],
        }),
        postProduct: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            })
        }),       
        updateProduct: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            })
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `/${id}`,
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const { useGetProductsQuery, usePostProductMutation, useUpdateProductMutation, useGetProductQuery, useDeleteProductMutation } = productApi;
export default productApi; 