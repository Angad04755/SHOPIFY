"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { db } from "../lib/database/Firebase";
import { doc, setDoc } from "firebase/firestore";

// this component watches the cart and saves it
// to firebase (signed in) or localStorage (guest)
export function CartSync() {
  const { isSignedIn, user, isLoaded } = useUser();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartLoaded = useSelector((state: RootState) => state.cart.loaded);

  useEffect(() => {
    // wait until clerk is ready
    if (!isLoaded) return;

    // guest user - save cart to localStorage
    if (!isSignedIn || !user) {
      localStorage.setItem("guestCart", JSON.stringify(cartItems));
      return;
    }

    // wait until AuthSync has finished loading cart from firebase
    // this prevents overwriting firebase with empty cart on page refresh
    if (!cartLoaded) return;

    // signed in user - save cart to firebase
    async function saveToFirebase() {
      if (!user) return;
      try {
        const cartRef = doc(db, "carts", user.id);
        await setDoc(cartRef, { items: cartItems });
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    }

    saveToFirebase();
  }, [cartItems, isLoaded, isSignedIn, user, cartLoaded]);

  return null;
}