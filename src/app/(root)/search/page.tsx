import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
export const search = "force-dynamic";
const SearchPage = dynamic(() => import("@/components/search/SearchPage"));
const Page = () => {
  return (
    <Suspense>
      <Suspense>
    <SearchPage/>
    </Suspense>
    </Suspense>
  )
}
export default Page;