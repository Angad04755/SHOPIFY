"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { loginSchema, LoginType } from "./schema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SigninPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginType>({
      resolver: zodResolver(loginSchema),
    })

    const handleSignIn = () => {
        dispatch(authenticated(true));
        router.push("/");
      };
 return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-400 to-blue-500">
        <div className="bg-white w-[350px] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
              {...register("email")}
                type="email"
                placeholder="Enter email"
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus-within:ring-2 focus-within:ring-purple-500 transition duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Password</label>
              <input
              {...register("password")}
                type="password"
                placeholder="Enter password"
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus-within:ring-2 focus-within:ring-purple-500 transition duration-300"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 active:scale-95 transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
        </div>
    </>
 )
}

export default SigninPage;