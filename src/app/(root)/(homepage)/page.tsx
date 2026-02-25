import dynamic from "next/dynamic";
import { Suspense } from "react";
import {ClipLoader} from "react-spinners"
const Hero = dynamic(() => import("@/components/homepage/Hero"));
const Category = dynamic(() => import("@/components/homepage/Category"));

const Page = ()=>{
 return <>
         <Suspense fallback={<div className="mx-auto"><ClipLoader size={35} color="black"/></div>}>
        <Hero/>
        <Category/>
        </Suspense>
   </>
}
export default Page;