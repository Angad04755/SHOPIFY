import dynamic from "next/dynamic";
import { Suspense } from "react";

const DesktopProducts = dynamic(() =>
  import("@/components/product/DesktopProducts")
);

const MobileProducts = dynamic(() =>
  import("@/components/product/MobileProducts")
);


const Page = () => {

  return (
    <Suspense>
      <div className="hidden md:block">
        <Suspense>
        <DesktopProducts/>
        </Suspense>
      </div>

      <div className="block md:hidden">
        <Suspense>
        <MobileProducts/>
        </Suspense>
      </div>
    </Suspense>
  );
};

export default Page;