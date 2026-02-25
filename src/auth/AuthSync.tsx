"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/features/cart/cartSlice";

export default function AuthSync() {

  const { isSignedIn, user, isLoaded } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {

    if (!isLoaded) return;


    // SIGNED IN
    if (isSignedIn && user) {

      const guestCart =
        JSON.parse(localStorage.getItem("guest_cart") || "[]");

      const userCart =
        JSON.parse(localStorage.getItem(`user_cart_${user.id}`) || "[]");


      let mergedCart = [...userCart];


      guestCart.forEach((guestItem: any) => {

        const exist = mergedCart.find(
          (item) => item.product.id === guestItem.product.id
        );

        if (exist) {

          exist.quantity += guestItem.quantity;

        } else {

          mergedCart.push(guestItem);

        }

      });


      localStorage.setItem(
        `user_cart_${user.id}`,
        JSON.stringify(mergedCart)
      );


      localStorage.removeItem("guest_cart");


      dispatch(saveCart(mergedCart));

    }


    // SIGNED OUT (IMPORTANT FOR REFRESH)
    else {

      const guestCart =
        JSON.parse(localStorage.getItem("guest_cart") || "[]");

      dispatch(saveCart(guestCart));

    }

  }, [isSignedIn, user, isLoaded]);

  return null;

}