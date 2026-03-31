import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import authSlice from "./features/auth/authSlice";
import registerSlice from "./features/auth/registerSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  register: registerSlice,

});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "register"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
   
});

export const persistor = persistStore(store);

export default store;