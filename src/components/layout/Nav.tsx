"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HeartIcon,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "../search/SearchBox";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-[100] w-full transition-all ${
          scrolled
            ? "bg-white/95 backdrop-blur shadow-md"
            : "bg-white"
        }`}
      >
        <nav className="container mx-auto px-4 h-[70px] flex items-center justify-between gap-4">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.png"
              alt="Shopify logo"
              width={44}
              height={44}
              priority
            />

            <span className="text-xl sm:text-2xl font-bold">
              Shopify
            </span>
          </Link>



          {/* SEARCH DESKTOP */}

          <div className="hidden md:block w-full max-w-md">

            <SearchBox />

          </div>



          {/* RIGHT SIDE DESKTOP */}

          <div className="hidden md:flex items-center gap-6">


            {/* FAVORITES */}

            <HeartIcon className="cursor-pointer hover:text-red-500 transition" />



            {/* CART */}

            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingCart />

              {totalQuantity > 0 && (

                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">

                  {totalQuantity}

                </span>

              )}

            </Link>



            {/* SIGN IN BUTTON DESKTOP */}

             <SignedIn>

              <UserButton />

            </SignedIn>

            <SignedOut>
            <Button
              text="Sign In"
              onClick={() =>
                router.push("/sign-in")
              }
              classname="bg-black text-white px-4 py-2 hover:bg-gray-800 active:scale-95 transition duration-150 cursor-pointer rounded-lg"
            />
          </SignedOut>


          </div>



          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden"
            aria-label="Open menu"
          >

            <Menu size={28} />

          </button>


        </nav>



        {/* SEARCH MOBILE */}

        <div className="md:hidden px-4 pb-3">

          <SearchBox />

        </div>

      </motion.header>



      {/* ================= MOBILE SIDEBAR ================= */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >


            {/* OVERLAY */}

            <div
              className="absolute inset-0 bg-black/40"
              onClick={() =>
                setIsOpen(false)
              }
            />



            {/* SIDEBAR */}

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-xl flex flex-col"
            >


              {/* TOP SECTION */}

              <div className="p-6 flex flex-col gap-6 flex-grow">


                {/* HEADER */}

                <div className="flex justify-between items-center">

                  <h2 className="text-lg font-semibold">

                    Menu

                  </h2>


                  <button
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >

                    <X size={24} />

                  </button>

                </div>



                {/* FAVORITES */}

                <div className="flex items-center gap-3 border p-3 rounded-lg">

                  <HeartIcon />

                  <span>
                    Favorites
                  </span>

                </div>



                {/* CART */}

                <Link
                  href="/cart"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center gap-3 border p-3 rounded-lg"
                >

                  <ShoppingCart />

                  <span>
                    Cart
                  </span>


                  {totalQuantity > 0 && (

                    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">

                      {totalQuantity}

                    </span>

                  )}

                </Link>


              </div>



              {/* SIGN IN BUTTON MOBILE */}

              <div className="p-6 border-t">
                <SignedIn>
                  <UserButton/>
                </SignedIn>
                <SignedOut>
                <Button
                  text="Sign In"
                  onClick={() => {
                    setIsOpen(false);

                    router.push(
                      "/sign-in"
                    );
                  }}
                  classname="w-full bg-black text-white py-3 active:scale-95 transition duration-150"
                />
                </SignedOut>

              </div>


            </motion.aside>


          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
};

export default Nav;
