import dynamic from "next/dynamic";
import { Suspense } from "react";

const SignupPage = dynamic(() => import("../../components/auth/SignupPage"));

function Page() {
    return (
        <Suspense>
            <SignupPage/>
        </Suspense>
    )
}
export default Page;