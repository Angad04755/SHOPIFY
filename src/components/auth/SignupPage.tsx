"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../../../store/features/auth/registerSlice";
import { useRouter } from "next/navigation";

import { registerSchema, RegisterType } from "./schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SignupPage() {

  const isRegistered = useSelector((state: any) => state.register.isRegistered);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = (data: RegisterType) => {
    console.log(data);

    dispatch(Register(true));
    router.push("/sign-in");
  };

  useEffect(() => {
    if (isRegistered) {
      router.push("/sign-in");
    }
  }, [isRegistered, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-400 to-blue-500">

      <div className="bg-white w-[350px] p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4"
        >

          {/* NAME */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="px-3 py-2 border rounded-md outline-none focus-within:ring-2 focus-within:ring-purple-500"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 border rounded-md outline-none focus-within:ring-2 focus-within:ring-purple-500"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="px-3 py-2 border rounded-md outline-none focus-within:ring-2 focus-within:ring-purple-500"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>

        </form>
      </div>

    </div>
  );
}

export default SignupPage;