"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllProduct } from "../../../Request/requests";
import { Product } from "../../../typing";
import { SearchIcon } from "lucide-react";
const SearchBox = () => {

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();


  // ✅ Sync input with URL query (IMPORTANT)
  useEffect(() => {

    const urlQuery = searchParams.get("query") || "";

    setQuery(urlQuery);

  }, [searchParams]);


  // ✅ Fetch all products once
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await getAllProduct();

        setProducts(res);

      } catch (error) {

        console.error(error);

      }

    };

    fetchProducts();

  }, []);


  // ✅ Clear search when going home
  useEffect(() => {
     setSuggestions([]);
    if (pathname === "/") {
      setQuery("");

    }

  }, [pathname]);


  // ✅ Filter suggestions
  useEffect(() => {

    if (!query.trim()) {

      setSuggestions([]);

      return;

    }

    const filtered = products
      .filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6);

    setSuggestions(filtered);

  }, [query, products]);


  // ✅ Redirect to search page
  const goToSearch = (value: string) => {

    const trimmed = value.trim();

    if (!trimmed) return;

    setQuery(trimmed);

    setSuggestions([]);

    router.push(`/search?query=${trimmed}`);

  };


  // ✅ Submit handler
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    goToSearch(query);

  };


  return (

    <div className="relative w-full flex justify-center">

      <div className="w-full max-w-2xl">

        {/* Search Form */}

        <form
          onSubmit={handleSearch}
          className="
            flex items-center
            rounded-full
            border border-gray-300
            bg-white
            transition
            focus-within:ring-2 focus-within:ring-blue-500
          "
        >
          <SearchIcon size={30} color="gray" className="px-1"/>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="
              flex-1
              rounded-l-full
              px-4 py-2
              text-sm sm:text-base
              text-gray-700
              placeholder-gray-400
              outline-none
            "
          />


        </form>


        {/* Suggestions Dropdown */}

        {suggestions.length > 0 && (

          <div
            className="
              absolute z-50 mt-2 w-full
              rounded-2xl
              bg-white/80 backdrop-blur-lg
              shadow-2xl
              border border-gray-200
              overflow-hidden
              transform transition-all duration-200 ease-out
            "
          >

            {suggestions.map(item => (

              <div
                key={item.id}
                onClick={() => goToSearch(item.title)}
                className="
                  px-4 py-3
                  cursor-pointer
                  text-sm text-gray-700
                  hover:bg-blue-50
                  transition
                  border-b last:border-b-0
                "
              >

                <span className="font-medium">

                  {item.title}

                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default SearchBox;
