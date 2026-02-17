"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../utilities/typing";
import { getProductsByCategory } from "../../../../Request/requests";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface Props {
  categorySlug: string;
}

const LIMIT = 8;

const DesktopProducts = ({ categorySlug }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProductsByCategory(
          categorySlug,
          LIMIT,
          skip
        );

        setProducts(data.products);

        setIsLastPage(skip + LIMIT >= data.total);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, skip]);

  const handleNext = () => {
    setSkip((prev) => prev + LIMIT)
  }
  const handlePrev = () => {
    setSkip((prev) => prev - LIMIT)
  }

  // Scroll to top (Myntra-like)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [skip]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {categorySlug.replace(/-/g, " ")}
      </h1>

      {loading && (
        <p className="text-center text-gray-500 mb-4">
          Loading products...
        </p>
      )}

      {/* Stable grid – no forced remount */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="grid grid-cols-4 gap-6"
      >
        {products.map((product) => (
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

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={skip === 0}
          onClick={handlePrev}
          className="px-5 py-2 border rounded-md disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={isLastPage}
          onClick={handleNext}
          className="px-5 py-2 border rounded-md disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DesktopProducts;
