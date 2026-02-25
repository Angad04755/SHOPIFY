import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

const DesktopProducts = dynamic(() =>
  import("@/components/product/DesktopProducts")
);

const MobileProducts = dynamic(() =>
  import("@/components/product/MobileProducts")
);

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {

  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="mx-auto">
          <ClipLoader size={35} color="black" />
        </div>
      }
    >
      <div className="hidden md:block">
        <DesktopProducts categorySlug={slug} />
      </div>

      <div className="block md:hidden">
        <MobileProducts categorySlug={slug} />
      </div>
    </Suspense>
  );
};

export default Page;