import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
const CartPage = dynamic(() => import("@/components/cart/CartPage"));
const Page = () => {
  return (
    <Suspense fallback={<div className="mx-auto"><ClipLoader size={35} color="black"/></div>}>
    <CartPage/>
    </Suspense>
  )
}
export default Page;