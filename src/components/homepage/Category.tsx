"use client";

import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../lib/api/requests";
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
    <section className="relative pt-5 pb-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container w-11/12 md:w-4/5 mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900">
            Shop by Category
          </h1>

          <p className="mt-5 text-gray-500 text-base sm:text-lg">
            Discover products curated just for you
          </p>

          <div className="w-16 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.02,
                duration: 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              
              whileTap={{ scale: 0.90 }}
              onClick={() =>
                router.push(
                  `category/${category.name.replace(" ", "-")}`
                )
              }
              className="
                relative overflow-hidden
                p-8 rounded-3xl cursor-pointer
                bg-white border border-gray-200
                shadow-sm hover:shadow-2xl
                transition-all duration-300
                group
              "
            >
              {/* Hover glow */}
              <div
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-br from-indigo-50 via-transparent to-blue-50
                "
              />

              <p
                className="
                  relative z-10
                  capitalize font-semibold
                  text-gray-800 text-[15px] md:text-lg sm:text-md
                  group-hover:text-indigo-600
                  transition-colors duration-300 text-center
                "
              >
                {category.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
