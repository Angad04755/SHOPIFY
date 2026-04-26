"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "../product/types";
import { SearchIcon } from "lucide-react";
import { searchProduct } from "../../api/ApiRquests"

const SearchBox = () => {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  // Debounce using useEffect
  useEffect(() => {

    if (!isTyping) return;

    if (!query.trim()) {

      setSuggestions([]);

      return;

    }

    const timer = setTimeout(async () => {

      try {

        const res = await searchProduct(query);

        setSuggestions(res.slice(0, 6));

      } catch (error) {

        console.error(error);

      }

    }, 500); // debounce delay


    // cleanup function
    return () => clearTimeout(timer);

  }, [query]);


  // clear when route changes
  useEffect(() => {

    if (pathname === "/" || pathname === "/cart") {

      setQuery("");

      setSuggestions([]);

    }

  }, [pathname]);


  // sync query from URL
  useEffect(() => {

    const urlQuery = searchParams.get("query");

    if (!urlQuery) return;

    setQuery(urlQuery);

    setSuggestions([]);

    setIsTyping(false);

  }, [searchParams]);


  // typing
  const handleChange = (value: string) => {

    setQuery(value);

    setIsTyping(true);

  };


  // redirect
  const goToSearch = (value: string) => {

    const trimmed = value.trim();

    if (!trimmed) return;

    setQuery(trimmed);

    setSuggestions([]);

    setIsTyping(false);

    router.push(`/search?query=${trimmed}`);

  };


  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    goToSearch(query);

  };


  return (

    <div className="w-full flex justify-center">

      <div className="w-full relative">

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-23px rounded-full border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 ease-in-out"
        >

          <SearchIcon size={30} color="gray" className="px-1 " />

          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none relative"
          />

        </form>
 
        <div className="absolute w-fit top-12 z-50 rounded-xl bg-white shadow border">

        {suggestions.length > 0 && (

          <div>

            {suggestions.map((i) => {
              return (
                <div
                  key={i.id}
                  onClick={() => goToSearch(i.title)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-xl"
                >

                  {i.title}

                </div>
              )
            })}
      

          </div>

        )}
        </div>

      </div>

    </div>

  );

};

export default SearchBox;