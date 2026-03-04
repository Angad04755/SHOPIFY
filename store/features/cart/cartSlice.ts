import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../src/types/typing";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loaded: boolean; // is cart ready?
}

const initialState: CartState = {
  items: [],
  loaded: false, // cart is not ready yet on page load
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // called by AuthSync after fetching from firebase
    saveCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.loaded = true; // cart is now ready!
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
      state.loaded = true;
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