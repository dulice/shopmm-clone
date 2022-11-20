import { createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: JSON.parse(localStorage.getItem('dashboardUser')) || null,
    },
    reducers: {
        register: (state, action) => {
            state.user = action.payload
            localStorage.setItem('dashboardUser', JSON.stringify(state.user));
        },
        logout: (state, action) => {
            state.user = null
            localStorage.removeItem('dashboardUser');
        },
    },
    extraReducers: ( builder ) => {
        builder.addMatcher(userApi.endpoints.userSignup.matchFulfilled, (state, action) => action.payload);
        builder.addMatcher(userApi.endpoints.userLogin.matchFulfilled, (state, action) => action.payload);
    }
});

export const { register, logout } = userSlice.actions;
export default userSlice.reducer;