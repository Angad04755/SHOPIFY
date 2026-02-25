import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
export const search = "force-dynamic";
const SearchPage = dynamic(() => import("@/components/search/SearchPage"));
const Page = () => {
  return (
    <Suspense fallback={<div className="mx-auto"><ClipLoader size={35} color="black"/></div>}>
    <SearchPage/>
    </Suspense>
  )
}
export default Page;