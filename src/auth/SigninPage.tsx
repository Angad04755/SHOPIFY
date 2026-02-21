import { SignIn } from "@clerk/nextjs";
const SigninPage = () => {
    return (
        <div className="flex justify-center items-center px-auto py-auto">
            <SignIn/>
        </div>
    )
}
export default SigninPage;