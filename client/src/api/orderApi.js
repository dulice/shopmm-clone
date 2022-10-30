import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/orders"}),
    endpoints: (builder) => ({
        trackOrder: builder.query({
            query: (id) => ({
                url: `/userOrder/${id}`,
            })
        }),
        orderDetail: builder.query({
            query: (id) => ({
                url: `/${id}`
            })
        })
    })
})

export const { useTrackOrderQuery, useOrderDetailQuery } = orderApi;
export default orderApi;