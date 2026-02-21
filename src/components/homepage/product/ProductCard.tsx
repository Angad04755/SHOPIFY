"use client";

import React from "react";
import { Product } from "../../../utilities/typing";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBagIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../store/cartSlice";
import { AddDispatch } from "../../../../store/store";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const rate = product.rating ?? 0;
  const num = Math.round(rate);
  const ratingArray = new Array(num).fill(0);

  
  const dispatch = useDispatch<AddDispatch>();

  const addToCartHandler = () => {
    dispatch(addItem(product));
  };

  return (
    <article className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col h-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs">
      {/* Product Image */}
      <div className="flex justify-center items-center h-40 sm:h-48 md:h-56">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain max-h-full max-w-full"
        />
      </div>

      {/* Category */}
      <p className="mt-3 text-sm sm:text-base capitalize text-gray-500">
        {product.category}
      </p>

      {/* Title */}
      <Link href={`/product/product-details/${product.id}`}>
        <h1 className="mt-1 text-base sm:text-lg font-semibold text-black cursor-pointer hover:text-blue-700 hover:underline line-clamp-2">
          {product.title}
        </h1>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <p className="text-gray-400 text-sm sm:text-base line-through font-medium">
          ${(product.price + 10).toFixed(2)}
        </p>
        <p className="text-black text-lg sm:text-xl font-bold">
          ${product.price}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex items-center space-x-2">
        <ShoppingBagIcon
          className="w-5 h-5 cursor-pointer"
          onClick={addToCartHandler}
        />
        <Heart className="hover:fill-red-600 hover:stroke-red-800 transition-colors duration-800 ease-in-out cursor-pointer" />
      </div>

      {/* Ratings */}
      <div className="flex items-center mt-2">
        {ratingArray.map((_, i) => (
          <span key={i} className="text-yellow-500 text-sm">
            ★
          </span>
        ))}
        {ratingArray.length === 0 && (
          <span className="text-gray-400 text-sm">No ratings yet</span>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
