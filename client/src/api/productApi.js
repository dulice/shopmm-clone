import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/products"}),

    endpoints: (builder) => ({
        products: builder.query({
            query: (limit) => ({
                url: `?limit=${limit || 6}`,
            }),
        }),
        singleProduct: builder.query({
            query: (id) => ({
                url: `/${id}`,
                // params: id
            }),
        }),
        searchProduct: builder.query({
            query: (item) => ({
                url: `/search/${item}`
            })
        }),
        categories: builder.query({
            query: () => ({
                url: '/category'
            })
        }),
        slugProduct: builder.query({
            query: (slug) => ({
                url: `/categories/${slug}`
            })
        }), 
        review: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/review/${id}`,
                method: 'PUT',
                body,
            })
        })      
    })
});

export const { useProductsQuery, useSingleProductQuery, useSearchProductQuery, useCategoriesQuery, useSlugProductQuery, useReviewMutation } = productApi;
export default productApi;