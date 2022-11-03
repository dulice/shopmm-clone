import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const summaryApi = createApi({
    reducerPath: "summaryApi",
    baseQuery: fetchBaseQuery({baseUrl: "/orders"}),
    endpoints: (builder) => ({
        summary: builder.query({
            query: () => ({
                url: '/summary'
            })
        }),
        users: builder.query({
            query: () => ({
                url: '/user'
            })
        })
    })
});

export const { useSummaryQuery, useUsersQuery } = summaryApi;
export default summaryApi;