import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../src/utilities/typing";

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
    /* Add item to cart */
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

    /* Remove product completely */
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

/* -------------------- */
/* EXPORTS             */
/* -------------------- */
export const {
  addItem,
  removeItem,
  removeItemCompletely,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
