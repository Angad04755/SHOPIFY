// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Product } from "../../types/typing";
// import { getProductsByCategory } from "../../api/ApiRquests";
// import ProductCard from "./ProductCard";
// import { motion } from "framer-motion";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";

// const LIMIT = 4;

// const MobileProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [skip, setSkip] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const {slug} = useParams();
//   const observerTarget = useRef(null);

//   const { data =[], isLoading } = useQuery({
//     queryKey: ["mobile-products", slug, skip],
//     queryFn: () => getProductsByCategory(slug, LIMIT, skip),
//   });

//   useEffect(() => {
//     if (!data) return;
//     setProducts((prev) => [...prev, ...data]);
//     if (data.length < LIMIT) setHasMore(false);
//   }, [data]);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && !isLoading && hasMore) {
//         setSkip((prev) => prev + LIMIT);
//       }
//     });
//     if (observerTarget.current) observer.observe(observerTarget.current);
//     return () => observer.disconnect();
//   }, [isLoading, hasMore]);

//   // reset when category changes
//   useEffect(() => {
//     setProducts([]);
//     setSkip(0);
//     setHasMore(true);
//   }, [slug]);

//   return (
//     <section className="px-4 py-6">
//       <h1 className="text-xl font-semibold mb-4 capitalize">
//         {slug}
//       </h1>

//       <div className="grid grid-cols-2 gap-4">
//         {products.map((product) => (
//           <motion.div
//             key={product.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.25, ease: "easeOut" }}
//           >
//             <ProductCard product={product} />
//           </motion.div>
//         ))}
//       </div>

//       {hasMore && (
//         <div ref={observerTarget} className="h-12 flex justify-center items-center">
//           {isLoading && (
//             <p className="text-gray-500 text-sm">Loading more products...</p>
//           )}
//         </div>
//       )}

//       {!hasMore && (
//         <p className="text-center text-gray-400 text-sm mt-6">
//           You've reached the end
//         </p>
//       )}
//     </section>
//   );
// };

// export default MobileProducts;