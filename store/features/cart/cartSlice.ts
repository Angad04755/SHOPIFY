import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../src/types/typing";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    /* Load or restore full cart */
    saveCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    /* Add item */
    addItem: (state, action: PayloadAction<Product>) => {

      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        state.items.push({
          product: action.payload,
          quantity: 1,
        });

      }

    },

    /* Remove one quantity */
    removeItem: (state, action: PayloadAction<number>) => {

      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {

        item.quantity -= 1;

      } else {

        state.items = state.items.filter(
          (item) => item.product.id !== action.payload
        );

      }

    },

    /* Remove completely */
    removeItemCompletely: (state, action: PayloadAction<number>) => {

      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );

    },

    /* Clear cart */
    clearCart: (state) => {

      state.items = [];

    },

  },

});

export const {
  saveCart,
  addItem,
  removeItem,
  removeItemCompletely,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;