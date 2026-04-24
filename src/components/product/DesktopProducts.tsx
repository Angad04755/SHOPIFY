"use client";

import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../api/ApiRquests";
import ProductCard from "../ui/ProductCard";
import { motion, number } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../product/types";
import { GridLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";

const productsPerPage = 4;

const DesktopProducts = () => {
  const [page, setPage] = useState(1);
  const { slug } = useParams();

  const skip = (page - 1) * productsPerPage;

  const { data, isFetching } = useQuery({
    queryKey: ["products", slug, skip],
    queryFn: () => getProductsByCategory(slug, productsPerPage, skip),
    initialData: {
      products: [],
      total: 0,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  if (isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center mt-10">
        <GridLoader size={25} color="black" />
      </div>
    );
  }

  const products: Product[] = data.products;
  const total = data.total;

  const TOTAL_PAGES = Math.ceil(total / productsPerPage);
  const isLastPage = page === TOTAL_PAGES;


  // pagination logic
  const pages = [];

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    if (
      i === 1 ||
      i === TOTAL_PAGES ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pages.push(i);
    } else {
      pages.push(null);
    }
  }

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6 capitalize">{slug}</h1>

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

      {/* Pagination */}
      <div className="w-full flex justify-center gap-1 mt-8 items-center">

        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-1 py-1 border rounded-md disabled:opacity-40"
        >
          <ChevronLeft size={25} color="black" />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {pages.map((p: number | null, index: number) => {
            if ( p === null) {
              return (
                <span key={index} className="px-2 text-gray-500 mt-[10px]">
                  {"..."}
                </span>
              );
            }

            return (
              <button
                key={index}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded-md cursor-pointer ${
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
          <ChevronRight size={25} color="black" />
        </button>
      </div>

      {/* End message */}
      {isLastPage && (
        <p className="text-center text-gray-400 text-sm mt-6">
          You've reached the end
        </p>
      )}
    </section>
  );
};

export default DesktopProducts;