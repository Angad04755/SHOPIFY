import dynamic from "next/dynamic";
import { Suspense } from "react";

const CartPage = dynamic(() => import("@/components/cart/CartPage"));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartPage />
    </Suspense>
  );
}

