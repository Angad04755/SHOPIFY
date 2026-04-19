"use client";

import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { addItem } from "../../../store/features/cart/cartSlice";
import { Product } from "../product/types";
import Button from "../ui/Button";
import { fetchProduct } from "@/api/ApiRquests";
import { toast } from "react-toastify";
import { useCallback } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),

    initialData: {
      product: "",
    }
  });

  const product: Product = data.product

  const handleAddItem = useCallback(() => {
    if (product) {
      dispatch(addItem(product));
      toast.success("Added to cart");
    }
  }, [product])
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden
                   flex flex-col md:grid md:grid-cols-2"
      >
        {/* Image Section */}
        <div className="bg-gray-100 flex items-center justify-center p-6 sm:p-10">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={320}
            height={320}
            className="object-contain rounded-lg w-full max-w-[280px] sm:max-w-[320px]"
            priority
          />
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-5">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>

            <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mt-4">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating ? `${product.rating} / 5 rating` : "No ratings yet"}
              </span>
            </div>

            {/* Price */}
            <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-6">
              ${product.price}
            </p>
          </div>
          <Button text="Add to Cart" onClick={handleAddItem} classname="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition-all duration-150 cursor-pointer active:scale-95" />
        </div>
      </motion.div>
    </motion.div>
  );
}