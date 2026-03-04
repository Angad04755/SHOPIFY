"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCart, mergeCart, clearCart } from "../../store/features/cart/cartSlice";
import { db } from "../lib/database/Firebase";
import { doc, getDoc } from "firebase/firestore";

// this component runs when user signs in
// it loads the cart from firebase and merges guest cart
export function AuthSync() {
  const { isSignedIn, user, isLoaded } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    // wait until clerk knows if user is signed in or not
    if (!isLoaded || !isSignedIn || !user) {
      dispatch(clearCart());
      return;
    }
      
      

    async function loadCart() {
      if (!user) return;

      // get cart from firebase
      const cartRef = doc(db, "carts", user.id);
      const snap = await getDoc(cartRef);

      // get guest cart from localStorage
      const guestCartRaw = localStorage.getItem("guestCart");
      const guestItems = guestCartRaw ? JSON.parse(guestCartRaw) : [];

      if (snap.exists()) {
        // load firebase cart
        dispatch(saveCart(snap.data().items || []));
        // if guest had items, merge them in
        if (guestItems.length > 0) {
          dispatch(mergeCart(guestItems));
        }
      } else {
        // no firebase cart yet, just load guest cart
        dispatch(saveCart(guestItems));
      }

      // clear guest cart after merging
      localStorage.removeItem("guestCart");
    }

    loadCart();
  }, [isLoaded, isSignedIn, user, dispatch]);

  return null;
}