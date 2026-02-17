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
  const [isTyping, setIsTyping] = useState(false); // ✅ important

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    if (pathname === "/" || pathname === "/cart") {
      setQuery("");
    }
  }, [pathname]);
  // Sync query from URL (but don't show suggestions)
  useEffect(() => {

  const urlQuery = searchParams.get("query");

  if (!urlQuery) return;

  setQuery(urlQuery);

  setSuggestions([]);

  setIsTyping(false);

}, [searchParams]);

  //  Fetch products
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


  //  Filter suggestions ONLY when typing
  useEffect(() => {

    if (!isTyping) return;

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

  }, [query, products, isTyping]);


  //  Handle typing
  const handleChange = (value: string) => {

    setQuery(value);

    setIsTyping(true);

  };


  // ✅ Search redirect
  const goToSearch = (value: string) => {

    const trimmed = value.trim();

    if (!trimmed) return;

    setQuery(trimmed);

    setSuggestions([]);

    setIsTyping(false);

    router.push(`/search?query=${trimmed}`);

  };


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    goToSearch(query);

  };


  return (

    <div className="relative w-full flex justify-center">

      <div className="w-full max-w-2xl">

        <form
          onSubmit={handleSearch}
          className="flex items-center rounded-full border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition duration-300"
        >

          <SearchIcon size={30} color="gray" className="px-1"/>

          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none"
          />

        </form>


        {suggestions.length > 0 && (

          <div className="absolute z-50 mt-2 w-full rounded-2xl bg-white backdrop-blur-md shadow-2xl border">

            {suggestions.map(item => (

              <div
                key={item.id}
                onClick={() => goToSearch(item.title)}
                className="px-4 py-3 cursor-pointer hover:bg-blue-50"
              >

                {item.title}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default SearchBox;
