"use client";

import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../lib/api/ApiRquests";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/typing";

const LIMIT = 4;

const DesktopProducts = () => {
  const [skip, setSkip] = useState(0);
  const { slug } = useParams();

  const { data = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", slug, skip],
    queryFn: () => getProductsByCategory(slug, LIMIT, skip),
  });

  const isLastPage = data.length < LIMIT;

  
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6 capitalize">{slug}</h1>

      {isLoading && (
        <p className="text-center text-gray-500 mb-4">Loading products...</p>
      )}

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-6"
      >
        {data.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={skip === 0}
          onClick={() => setSkip((prev) => prev - LIMIT)}
          className="px-5 py-2 border rounded-md disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={isLastPage}
          onClick={() => setSkip((prev) => prev + LIMIT)}
          className="px-5 py-2 border rounded-md disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DesktopProducts;