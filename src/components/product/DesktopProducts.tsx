"use client";

import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../api/ApiRquests";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/typing";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LIMIT = 4;

const DesktopProducts = () => {
  const [page, setPage] = useState(1);

  const { slug } = useParams();

  const skip = (page - 1) * LIMIT;

  const { data, isLoading } = useQuery({
    queryKey: ["products", slug, skip],
    queryFn: () => getProductsByCategory(slug, LIMIT, skip),

    initialData: {
      products: [],
      total: 0,
    }
  });

  // ✅ hooks always run
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  // 🔥 loading state
  if (isLoading) {
    return (
      <p className="text-center mt-10">
        <ClipLoader size={45} color="black" />
      </p>
    );
  }


  // ✅ safe usage
  const products: Product[] = data.products;
  const total = data.total;

  const TOTAL_PAGES = Math.ceil(total / LIMIT);
  const isLastPage = page === TOTAL_PAGES;

  const DOTS = "...";

  const getPages = () => {
  const pages: (any)[] = [];
  let i = 1;

  while (i <= TOTAL_PAGES) {
    if (i === 1 || i === TOTAL_PAGES) {
      pages.push(i);
      i++;
    } else if (i >= page - 1 && i <= page + 1) {
      pages.push(i);
      i++;
    } else {
      pages.push(DOTS);

      if (i < page) {
        i = page - 1;
      } else {
        i = TOTAL_PAGES;
      }
    }
  }

  return pages;
};
  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {slug}
      </h1>

      {/* Products */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* 🔥 Pagination */}
      <div className="w-full flex justify-center gap-1 mt-8 items-center">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-1 py-1 border rounded-md disabled:opacity-40"
        >
          <ChevronLeft size={25} color="black"/>
        </button>

        {/* Pages */}
        <div className="flex gap-2">
  {getPages().map((p, index) => {
    if (p === DOTS) {
      return (
        <span key={index} className="px-2 text-gray-500">
          ...
        </span>
      );
    }

    return (
      <button
        key={index}
        onClick={() => setPage(p)}
        className={`px-3 py-1 border rounded-md ${
          page === p ? "bg-black text-white" : ""
        }`}
      >
        {p}
      </button>
    );
  })}
</div>
        {/* Next */}
        <button
          disabled={isLastPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-1 py-1 border rounded-md disabled:opacity-40"
        >
          <ChevronRight size={25} color="black"/>
        </button>
      </div>

      {/* End */}
      {isLastPage && (
        <p className="text-center text-gray-400 text-sm mt-6">
          You've reached the end
        </p>
      )}
    </section>
  );
};

export default DesktopProducts;