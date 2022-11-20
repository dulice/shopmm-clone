import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/auth'}),
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

    })
});

export const { useUserSignupMutation, useUserLoginMutation } = userApi;
export default userApi;