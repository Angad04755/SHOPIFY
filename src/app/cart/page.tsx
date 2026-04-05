import dynamic from "next/dynamic";
import { Suspense } from "react";
const CartPage = dynamic(() => import("@/components/cart/CartPage"));
const Page = () => {
  return (
    <Suspense>
    <CartPage/>
    </Suspense>
  )
}
export default Page;