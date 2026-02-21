"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProduct } from "../../utilities/requests";
import { Product } from "../../utilities/typing";
import ProductCard from "../homepage/product/ProductCard";
import { motion } from "framer-motion";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await searchProduct(query);
        setProducts(data);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [query]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section>
        {/* SEARCH HEADER */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 bg-white rounded-2xl p-6 shadow-sm border"
        >
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Search results
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing results for{" "}
            <span className="font-medium text-gray-800">
              “{query}”
            </span>
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-gray-500 text-sm"
            >
              Searching products…
            </motion.div>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-sm">
              No products found matching your search.
            </p>
          </motion.div>
        )}

        {/* RESULTS */}
        {!loading && products.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
        </section>
      </main>
    </motion.section>
  );
};

export default SearchPage;
