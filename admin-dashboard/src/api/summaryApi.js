import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL + '/orders';
const summaryApi = createApi({
    reducerPath: "summaryApi",
    tagTypes: ['order'],
    baseQuery: fetchBaseQuery({baseUrl }),
    endpoints: (builder) => ({
        orders: builder.query({
            query: () => ({
                url: '/order'
            }),
            providesTags: ['order']
        }),
        summary: builder.query({
            query: () => ({
                url: '/summary'
            })
        }),
        users: builder.query({
            query: () => ({
                url: '/user'
            })
        }),
        deliverOrder: builder.mutation({
            query: ({id, ...body}) => ({ 
               url: `/${id}`,
               method: 'PUT',
               body,
            }),
            invalidatesTags: ['order']
        })
    })
});

export const { useSummaryQuery, useUsersQuery, useOrdersQuery, useDeliverOrderMutation } = summaryApi;
export default summaryApi;