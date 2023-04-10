import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = process.env.REACT_APP_API_URL + '/orders';
const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
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