import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL + '/auth';
const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    tagTypes: ['user'],

    endpoints: (builder) => ({
        userSignup: builder.mutation({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            providesTags: ['user'],
        }),
        userLogin: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            }),
            providesTags: ['user'],
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `/${id}`,
            })
        })
    })
});

export const { useUserSignupMutation, useUserLoginMutation, useGetUserQuery } = userApi;
export default userApi;