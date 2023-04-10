import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL + '/auth';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
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
            })
        }),

    })
});

export const { useUserSignupMutation, useUserLoginMutation } = userApi;
export default userApi;