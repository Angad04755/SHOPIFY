"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { RootState } from "../../store/store";

export default function CartSync() {

  const { isSignedIn, user, isLoaded } = useUser();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const firstLoad = useRef(true);


  useEffect(() => {

    // 🚨 VERY IMPORTANT
    // skip first render
    if (firstLoad.current) {

      firstLoad.current = false;
      return;

    }


    if (!isLoaded) return;


    if (isSignedIn && user) {

      localStorage.setItem(
        `user_cart_${user.id}`,
        JSON.stringify(cartItems)
      );

    }

    else {

      localStorage.setItem(
        "guest_cart",
        JSON.stringify(cartItems)
      );

    }

  }, [cartItems, isSignedIn, user, isLoaded]);


  return null;

}