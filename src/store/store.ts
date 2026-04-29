import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import cartSlice from "../store/features/cart/cartSlice";
import registerSlice from "../store/features/auth/registerSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        register: registerSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;