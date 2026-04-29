"use client";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import {
  addItem,
  removeItem,
  clearCart,
  removeItemCompletely,
} from "@/store/features/cart/cartSlice";
import PaypalButton from "../payment/PaypalButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const totalQuantity = useMemo(
    () => items.reduce((t, i) => t + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      Number(
        items
          .reduce((t, i) => t + i.product.price * i.quantity, 0)
          .toFixed(2)
      ),
    [items]
  );

  const vat = useMemo(() => Number((subtotal * 0.15).toFixed(2)), [subtotal]);

  const totalPriceVat = useMemo(
    () => Number((subtotal + vat).toFixed(2)),
    [subtotal, vat]
  );

  const handleSuccess = () => {
    dispatch(clearCart());
    router.push("/success");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <Image src="/images/cart.svg" alt="empty" width={280} height={280} />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <Link href="/" className="mt-6">
            <button className="bg-black text-white px-6 py-3 rounded-full">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-xl font-semibold">
              Shopping Cart ({totalQuantity})
            </h1>

            {items.map((item) => (
              <motion.div
                key={item.product.id}
                className="bg-white rounded-2xl p-4 shadow-sm border flex gap-4"
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="text-sm font-medium">
                    {item.product.title}
                  </h3>

                  <div className="flex justify-between mt-4">
                    <span>${item.product.price}</span>
                    <span>Qty {item.quantity}</span>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => dispatch(addItem(item.product))}
                    >
                      + Add
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeItem(item.product.id))
                      }
                    >
                      Remove
                    </button>

                    <Trash2
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch(removeItemCompletely(item.product.id))
                      }
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>VAT (15%)</span>
                <span>${vat}</span>
              </div>

              <div className="flex justify-between font-semibold border-t pt-4">
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
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;