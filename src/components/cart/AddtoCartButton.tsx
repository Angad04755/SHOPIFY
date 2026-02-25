"use client";

import { useDispatch } from "react-redux";
import { addItem } from "../../../store/features/cart/cartSlice";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import { Product } from "@/types/typing";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {

  const dispatch = useDispatch();

  function handleAdd() {

    dispatch(addItem(product));

    toast.success("Added to cart");

  }

  return (

    <Button
      onClick={handleAdd}
      classname="bg-black text-white px-4 py-3 rounded-xl active:scale-95 transition duration-150 cursor-pointer"
      text="Add to Cart"
    />

  );

}