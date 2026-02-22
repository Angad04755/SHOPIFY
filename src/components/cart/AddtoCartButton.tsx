import { AddDispatch } from "../../../store/store";
import { useDispatch, UseDispatch } from "react-redux";
import Button from "../ui/Button";
import { Product } from "@/types/typing";
import { addItem } from "../../../store/features/cart/cartSlice";
import {toast} from "react-toastify"
interface ProductProps {
    product: Product;
}

function AddtoCartButton({product}: ProductProps) {

    const dispatch = useDispatch<AddDispatch>();

    function handleDispatch () {
        dispatch(addItem(product));
        toast.success("added to cart");
    };
    return (
    <Button onClick={handleDispatch} classname="bg-black text-white px-3 py-5 rounded-xl cursor-pointer transition duration-150 active:scale-90" text="Add to Cart"/>
    )
}
export default AddtoCartButton;