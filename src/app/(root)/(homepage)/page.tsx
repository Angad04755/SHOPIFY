import dynamic from "next/dynamic";
import { Suspense } from "react";
import {BeatLoader} from "react-spinners"
const Hero = dynamic(() => import("@/components/homepage/Hero"));
const Category = dynamic(() => import("@/components/homepage/Category"));

const Page = ()=>{
 return <>
         <Suspense>
        <Hero/>
        <Category/>
        </Suspense>
   </>
}
export default Page;