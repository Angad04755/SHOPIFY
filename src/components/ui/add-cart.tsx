"use client"
import React from "react";
import { Product } from "../../utilities/typing";
import { AddDispatch } from "../../../store/store";
import { useDispatch, UseDispatch } from "react-redux";
import { addItem } from "../../../store/cartSlice";

interface ProductProps {
    product: Product
};

const AddToCart = ({product}: ProductProps) => {
    const dispatch = useDispatch<AddDispatch>();
    return(
        <button className="bg-gray-900 text-white p-2 rounded-lg cursor-pointer transform hover:scale-110 transition duration-300" onClick={() => dispatch(addItem(product))}>Add To Cart</button>
    )
}
export default AddToCart;