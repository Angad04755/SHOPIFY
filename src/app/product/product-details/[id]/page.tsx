import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
import { Suspense } from "react";

const ProductDetails = dynamic(() => import("@/components/product/productDetails")) 


export default async function Page() {
  return ( 
  <Suspense fallback={<div className="flex justify-center items-center"><ClipLoader size={55} color="black"/></div>}>
  <ProductDetails/>
  </Suspense>
  )
}