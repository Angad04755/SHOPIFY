"use client";

import React from "react";
import { ShoppingBagIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function ShoppingCartButton() {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  console.log("Cart items:", items, "Count:", totalQuantity);

  return (
    <div className="relative">
      {totalQuantity > 0 && (
        <span className="">
          {totalQuantity}
        </span>
      )}
      <ShoppingBagIcon className="cursor-pointer text-black w-6 h-6" />
    </div>
  );
}

export default ShoppingCartButton;
