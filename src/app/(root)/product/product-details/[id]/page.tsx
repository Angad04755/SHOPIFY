import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
import { Suspense } from "react";

const ProductDetails = dynamic(() => import("@/components/product/productDetails")) 
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return ( 
  <Suspense fallback={<div className="mx-auto"><ClipLoader size={35} color="black"/></div>}>
  <ProductDetails id={id}/>
  </Suspense>
  )
}