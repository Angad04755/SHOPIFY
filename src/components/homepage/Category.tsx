"use client";

import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../lib/api/ApiRquests"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 pb-16 text-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="pt-20 pb-16 text-center text-gray-500">
        No categories available
      </div>
    );
  }

  return (
    <section className="relative pt-5 pb-24 bg-gradient-to-b from-azure via-red-400 to-orange-200" style={{animation: "category 0.6s ease-in-out"}}>
      <div className="container w-11/12 md:w-4/5 mx-auto">

        {/* Heading */}
        <div
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900">
            Shop by Category
          </h1>

          <p className="mt-5 text-gray-500 text-base sm:text-lg">
            Discover products curated just for you
          </p>

          <div className="w-16 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.slug}
              
              onClick={() =>
                router.push(
                  `category/${category.name.replace(" ", "-")}`
                )
              }
              className="
                bg-white text-black py-10 cursor-pointer hover:ring-2 hover:ring-blue-400 transition duration-300 ease-in-out rounded-2xl hover:bg-black hover:text-white
              "
            >
              

              <p
                className="text-center"
              >
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
