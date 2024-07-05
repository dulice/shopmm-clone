import { createSlice } from '@reduxjs/toolkit';

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
});

export const { register, logout } = userSlice.actions;
export default userSlice.reducer;