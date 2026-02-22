"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "../../types/typing";
import { SearchIcon } from "lucide-react";
import { searchProduct } from "../../lib/api/requests";

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
    return () => { clearTimeout(timer) };

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

    <div className="relative w-full flex justify-center">

      <div className="w-full max-w-2xl">

        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-full border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 ease-in-out"
        >

          <SearchIcon size={30} color="gray" className="px-1" />

          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none"
          />

        </form>


        {suggestions.length > 0 && (

          <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow border">

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

  );

};

export default SearchBox;
