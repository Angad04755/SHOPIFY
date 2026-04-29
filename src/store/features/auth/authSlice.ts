import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload; 
    },
  },
});

export const { authenticated } = authSlice.actions;
export default authSlice.reducer;