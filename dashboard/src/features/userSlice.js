import { createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const admin = JSON.parse(localStorage.getItem('dashboardUser'));
const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: admin ? admin : null,
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