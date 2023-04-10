import { createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

const currentUser = JSON.parse(localStorage.getItem('user'));
const userSlice = createSlice({
    name: 'User',
    initialState: {
        user:  currentUser? currentUser : null,
    },
    reducers: {
        register: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: (state, action) => {
            state.user = null
            localStorage.removeItem('user');
        },
    },
    extraReducers: ( builder ) => {
        builder.addMatcher(userApi.endpoints.userSignup.matchFulfilled, (state, action) => action.payload);
        builder.addMatcher(userApi.endpoints.userLogin.matchFulfilled, (state, action) => action.payload);
    }
});

export const { register, logout } = userSlice.actions;
export default userSlice.reducer;