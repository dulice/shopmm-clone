import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
    name: "toggle",
    initialState: {
        isOpen: true,
        isdark: true,
        device: "laptop",
    },
    reducers: {
        toggleDrawer: (state, action) => {
            state.isOpen = action.payload;
        },
        toggleMode: (state) => {
            state.isdark =!state.isdark;
        },
        toggleDevice: (state, action) => {
            state.device = action.payload;
        },
    },
});
export const { toggleDrawer, toggleMode, toggleDevice } = toggleSlice.actions;
export default toggleSlice.reducer;