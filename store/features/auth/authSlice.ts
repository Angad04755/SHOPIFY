import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isAuthinticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<boolean>) => {
            state.isAuthinticated = action.payload;
        },

        signOut: (state, action: PayloadAction<boolean>) => {
            state.isAuthinticated =  action.payload;
        }
    }
})
export const {signIn, signOut} = authSlice.actions;
export default authSlice.reducer