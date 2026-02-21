"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../../../utilities/typing";
import { getProductsByCategory } from "../../../utilities/requests";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface Props {
  categorySlug: string;
}

const LIMIT = 6;

const MobileProducts = ({ categorySlug }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const data = await getProductsByCategory(
        categorySlug,
        LIMIT,
        skip
      );

      setProducts((prev) => [...prev, ...data.products]);

      if (skip + LIMIT >= data.total) {
        setHasMore(false);
      }

      setSkip((prev) => prev + LIMIT);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [products, loading]);

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold mb-4 capitalize">
        {categorySlug.replace(/-/g, " ")}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div
          ref={observerTarget}
          className="h-12 flex justify-center items-center"
        >
          {loading && (
            <p className="text-gray-500 text-sm">
              Loading more products...
            </p>
          )}
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-400 text-sm mt-6">
          You’ve reached the end
        </p>
      )}
    </section>
  );
};

export default MobileProducts;
