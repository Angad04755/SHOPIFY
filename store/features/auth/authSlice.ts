import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthinticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state) => {
            state.isAuthinticated = true;
        },

        signOut: (state) => {
            state.isAuthinticated =  false;
        }
    }
})
export const {signIn, signOut} = authSlice.actions;
export default authSlice.reducer