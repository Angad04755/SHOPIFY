import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopProducts = dynamic(() =>
  import("@/components/product/DesktopProducts")
);




const Page = () => {

  return (
    <Suspense>
    
        <Suspense>
        <DesktopProducts/>
        </Suspense>
    </Suspense>
  );
};

export default Page;