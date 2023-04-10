import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL + '/orders';
const summaryApi = createApi({
    reducerPath: "summaryApi",
    baseQuery: fetchBaseQuery({baseUrl }),
    endpoints: (builder) => ({
        orders: builder.query({
            query: () => ({
                url: '/order'
            })
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
            })
        })
    })
});

export const { useSummaryQuery, useUsersQuery, useOrdersQuery, useDeliverOrderMutation } = summaryApi;
export default summaryApi;