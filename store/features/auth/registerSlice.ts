import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isRegistered: false
}

const registerSlice = createSlice({
    name: "register",
    initialState,

    reducers: {
        Register: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload
        }
    }
})

export const {Register} = registerSlice.actions;

export default registerSlice.reducer;