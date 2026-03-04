"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AddDispatch } from "../../../store/store";
import Image from "next/image";
import Link from "next/link";
import {
  addItem,
  removeItem,
  clearCart,
  saveCart,
  mergeCart,
} from "../../../store/features/cart/cartSlice";
import PaypalButton from "../payment/PaypalButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { db } from "../../lib/database/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartPage = () => {
  const dispatch = useDispatch<AddDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const cartLoaded = useSelector((state: RootState) => state.cart.loaded);
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();

  // load cart when user signs in
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      dispatch(clearCart());
      return;
    }

    async function loadCart() {
      if (!user) return;

      const cartRef = doc(db, "carts", user.id);
      const snap = await getDoc(cartRef);

      const guestCartRaw = localStorage.getItem("guestCart");
      const guestItems = guestCartRaw ? JSON.parse(guestCartRaw) : [];

      if (snap.exists()) {
        dispatch(saveCart(snap.data().items || []));
        if (guestItems.length > 0) {
          dispatch(mergeCart(guestItems));
        }
      } else {
        dispatch(saveCart(guestItems));
      }

      localStorage.removeItem("guestCart");
    }

    loadCart();
  }, [isLoaded, isSignedIn, user, dispatch]);

  // save cart whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      localStorage.setItem("guestCart", JSON.stringify(items));
      return;
    }

    if (!cartLoaded) return;

    async function saveToFirebase() {
      if (!user) return;
      try {
        const cartRef = doc(db, "carts", user.id);
        await setDoc(cartRef, { items });
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    }

    saveToFirebase();
  }, [items, isLoaded, isSignedIn, user, cartLoaded]);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = Number(items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2));
  const vat = Number((subtotal * 0.15).toFixed(2));
  const totalPriceVat = Number((subtotal + vat).toFixed(2));

  const handleSuccess = () => {
    dispatch(clearCart());
    router.push("/success");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      {/* EMPTY STATE */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
          <Image src="/images/cart.svg" alt="empty" width={280} height={280} />
          <h2 className="mt-6 text-xl font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <Link href="/" className="mt-6">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {/* CART */}
      {items.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PRODUCTS */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Shopping Cart ({totalQuantity})
            </h1>

            {items.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-4 shadow-sm border flex gap-4"
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className="rounded-xl object-contain"
                />

                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">
                    {item.product.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.product.category}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold text-gray-900">
                      ${item.product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty {item.quantity}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => dispatch(addItem(item.product))}
                      className="text-xs px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() => dispatch(removeItem(item.product.id))}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SUMMARY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg h-fit lg:sticky lg:top-24"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">VAT (15%)</span>
                <span>${vat}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t pt-4">
                <span>Total</span>
                <span>${totalPriceVat}</span>
              </div>
            </div>

            <div className="mt-6">
              <PaypalButton
                amount={String(totalPriceVat)}
                onSuccess={handleSuccess}
              />
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure checkout · Powered by PayPal
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;