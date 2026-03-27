"use client";

import { useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { signIn } from "../../../store/features/auth/authSlice";
import { useRouter } from "next/navigation";

function SignupPage() {
  const [state, setState] = useState<"sign-in" | "register">("register");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ✅ FIXED: prevent reload + redirect works
  const handleSignIn = (e: any) => {
    e.preventDefault();
    dispatch(signIn());
    router.push("/");
  };

  const handleRegister = () => {
    setState("sign-in");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-400 to-blue-500">
      
      {/* REGISTER */}
      {state === "register" && (
        <div className="bg-white w-[350px] p-8 rounded-2xl shadow-xl">
          
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>

            <button type="submit"
              className="mt-2 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition duration-300"
            >Register</button>
          </form>

          
        </div>
      )}

      {/* SIGN IN */}
      {state === "sign-in" && (
        <div className="bg-white w-[350px] p-8 rounded-2xl shadow-xl">
          
          <h2 className="text-2xl font-bold text-center mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              />
            </div>

            <button
            type="submit"             
              className="bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 active:scale-95 transition duration-300"
            >Sign In</button>
          </form>

        </div>
      )}
    </div>
  );
}

export default SignupPage;