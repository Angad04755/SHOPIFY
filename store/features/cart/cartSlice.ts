import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../src/types/typing";
import { CartItem } from "../../../src/types/typing";

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

    // called by AuthSync after fetching from firebase
    saveCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    // called when guest signs in to merge their cart
    mergeCart: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach((guestItem) => {
        const existing = state.items.find(
          (item) => item.product.id === guestItem.product.id
        );
        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          state.items.push(guestItem);
        }
      });
    },

    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

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

    removeItemCompletely: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

  },
});

export const {
  saveCart,
  mergeCart,
  addItem,
  removeItem,
  removeItemCompletely,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;