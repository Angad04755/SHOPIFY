"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { HeartIcon, ShoppingCart, Menu, X, User, LogOut, Settings, Package } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../../../store/features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchBox from "../search/SearchBox";
import Button from "../ui/Button";
import { toast } from "react-toastify";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const [mobileProfileOpen, setmobileProfileOpen] = useState(false);



  const dispatch = useDispatch();

  const items = useSelector((state: any) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthinticated
  );

  const totalQuantity = items.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-[200] w-full transition-all ${
          scrolled
            ? "bg-indigo-100 backdrop-blur shadow-md"
            : "bg-indigo-100"
        }`}
      >
        <nav className="container mx-auto px-4 h-[70px] flex items-center justify-between gap-2 lg:gap-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Shopify logo"
              width={44}
              height={44}
              priority
            />
            <span className="text-lg md:text-xl lg:text-2xl font-bold">
              Shopify
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block w-full md:w-[420px] ml-[50px]">
            <SearchBox />
          </div>

          {/* TABLET VIEW */}
          <div className="hidden md:flex lg:hidden items-center gap-4 flex-1 justify-end">
            <Link href="/cart">
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute mt-[-35px] ml-[15px] w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(true)}>
              <Menu size={26} />
            </button>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden lg:flex items-center gap-6">

            <HeartIcon className="cursor-pointer hover:text-red-500 transition" />

            <Link href="/cart" className="relative">
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* PROFILE DROPDOWN
                - Click the icon → setProfileOpen(true) → dropdown shows
                - Click the icon again → setProfileOpen(false) → dropdown hides
                - ref={profileRef} is attached to the wrapper div so we know
                  which element is the dropdown container
            */}
            <div>

              {/* Profile Icon — clicking it toggles the dropdown */}
              <button
                onClick={() => setDesktopProfileOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-indigo-200 hover:bg-indigo-300 flex items-center justify-center transition duration-150"
              >
                <User size={18} className="text-indigo-800" />
              </button>

              {/* Dropdown — only renders when profileOpen is true */}
              <div>
              {desktopProfileOpen && (
                <div className="absolute ml-[-160px] mt-[10px] w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[300]">
                  {isAuthenticated ? (
                    <div>
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          user@example.com
                        </p>
                      </div>


                      {/* Sign Out */}
                      <div className="py-1 border-t border-gray-100">
                        <button
                          onClick={() => {
                            dispatch(signOut(false));
                            setDesktopProfileOpen(false);
                            toast.success("Signed out")
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 flex flex-col gap-2">
                      <p className="text-xs text-gray-500 px-1 pb-1">
                        Welcome! Please sign in.
                      </p>
                      <button
                        onClick={() => {
                          router.push("/sign-up");
                          setDesktopProfileOpen(false);
                        }}
                        className="w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition duration-150"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          router.push("/sign-up?mode=register");
                          setDesktopProfileOpen(false);
                        }}
                        className="w-full border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 active:scale-95 transition duration-150"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              )}
              </div>
            </div>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>

        </nav>

        {/* MOBILE SEARCH */}
        <div className="md:hidden px-4 pb-3">
          <SearchBox />
        </div>
      </motion.header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-xl flex flex-col"
            >
              <div className="p-6 flex flex-col gap-6 flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="flex items-center gap-3 border p-3 rounded-lg">
                  <HeartIcon />
                  <span>Favorites</span>
                </div>

                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 border p-3 rounded-lg"
                >
                  <ShoppingCart />
                  <span>Cart</span>
                  {totalQuantity > 0 && (
                    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </div>

        

            
                <button className="mb-5 w-9 h-9 rounded-full ml-[10px] bg-indigo-200 hover:bg-indigo-300 transition duration-150 flex justify-center items-center" onClick={() => setmobileProfileOpen((prev) => !prev)}>
                  <User className="text-indigo-500" size={20}/>
                </button>
                <div>
                  {mobileProfileOpen && (
                    <div className="absolute mt-[-180px] ml-[10px] w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-[300]">
                      {isAuthenticated ? (
                    <div>
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          user@example.com
                        </p>
                      </div>


                      {/* Sign Out */}
                      <div>
                        <button
                          onClick={() => {
                            dispatch(signOut(false));
                            setmobileProfileOpen(false);
                            setIsOpen(false)
                            toast.success("Signed out")
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition duration-150"
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                    )
                    :(
                      <div className="w-full absolute mt-[-20px] p-3 flex flex-col gap-2 shadow-xl rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 px-1 pb-1">
                    
                      </p>
                      <button
                        onClick={() => {
                          router.push("/sign-up");
                          setmobileProfileOpen(false);
                          setIsOpen(false)
                        }}
                        className="w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition duration-150"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          router.push("/sign-up");
                          setmobileProfileOpen(false);
                          setIsOpen(false)
                        }}
                        className="w-full border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 active:scale-95 transition duration-150"
                      >
                        Register
                      </button>
                    </div>
                  )}
                    </div>
                  )}
                </div>
                    
            </motion.aside>
          
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;