"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HeartIcon, ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { authenticated } from "../../../store/features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchBox from "../search/SearchBox";
import { toast } from "react-toastify";
import { Register } from "../../../store/features/auth/registerSlice";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const [mobileProfileOpen, setmobileProfileOpen] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector((state: any) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const isRegistered = useSelector((state: any) => state.register.isRegistered);

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
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-[200] w-full transition-all ${
          scrolled ? "bg-indigo-100 backdrop-blur shadow-md" : "bg-indigo-100"
        }`}
      >
        <nav className="container mx-auto px-4 h-[70px] flex items-center justify-between gap-2 lg:gap-4">

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

          <div className="hidden md:block w-full md:w-[420px] ml-[50px]">
            <SearchBox />
          </div>

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

            <div>
              <button
                onClick={() => setDesktopProfileOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-indigo-200 hover:bg-indigo-300 flex items-center justify-center transition duration-150"
              >
                <User size={18} className="text-indigo-800" />
              </button>

              <div>
                {desktopProfileOpen && (
                  <div className="absolute ml-[-160px] mt-[10px] w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[300]">

                    <div>
                      {isAuthenticated && isRegistered && (
                        <div>
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500">Signed in</p>
                          </div>

                          <div className="py-1 border-t border-gray-100">
                            <button
                              onClick={() => {
                                dispatch(authenticated(false));
                                setDesktopProfileOpen(false);
                                toast.success("Signed out");
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                            >
                              <LogOut size={15} /> Sign Out
                            </button>
                            <button
                              onClick={() => {
                                dispatch(authenticated(false));
                                dispatch(Register(false));
                                setDesktopProfileOpen(false);
                                toast.success("Account Deleted");
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                            >
                              <X size={15} /> Delete Account
                            </button>
                          </div>
                        </div>
                      )}
                    </div>


                    <div>
                      {!isAuthenticated && isRegistered && (
                        <div className="p-3 flex flex-col gap-2">
                          {/* <p className="text-xs text-gray-500 px-1 pb-1">
                            Welcome! Please create account.
                          </p> */}

                          <button
                            onClick={() => {
                              router.push("/sign-up");
                              setDesktopProfileOpen(false);
                            }}
                            className="w-full border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 active:scale-95 transition duration-150 cursor-pointer active:scale-95"
                          >
                            Sign in
                          </button>

                          <button
                              onClick={() => {
                                dispatch(authenticated(false));
                                dispatch(Register(false));
                                setDesktopProfileOpen(false);
                                toast.success("Account Deleted");
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                            >
                              <X size={15} /> Delete Account
                            </button>
                        </div>
                      )}
                    </div>



                    <div>
                      {!isAuthenticated && !isRegistered && (
                        <div className="p-3 flex flex-col gap-2">
                          <p className="text-xs text-gray-500 px-1 pb-1">
                            Welcome! Please create account.
                          </p>

                          <button
                            onClick={() => {
                              router.push("/sign-up");
                              setDesktopProfileOpen(false);
                            }}
                            className="w-full border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 active:scale-95 transition duration-150 cursor-pointer"
                          >
                            Register
                          </button>
                        </div>
                      )}
                    </div>


                  </div>
                )}
              </div>
            </div>

          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>

        </nav>

        <div className="md:hidden px-4 pb-3">
          <SearchBox />
        </div>
      </motion.header>

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

              <div>
                <button
                  className="mb-5 w-9 h-9 rounded-full ml-[10px] bg-indigo-200 hover:bg-indigo-300 transition duration-150 flex justify-center items-center"
                  onClick={() => setmobileProfileOpen((prev) => !prev)}
                >
                  <User className="text-indigo-500" size={20} />
                </button>

                {mobileProfileOpen && (
                  <div className="absolute mt-[-180px] ml-[10px] w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-[300]">

                    <div>
                      {isAuthenticated && (
                        <div>
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500">Signed in as</p>
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              user@example.com
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              dispatch(authenticated(false));
                              setmobileProfileOpen(false);
                              setIsOpen(false);
                              toast.success("Signed out");
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition duration-150"
                          >
                            <LogOut size={15} /> Sign Out
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      {!isAuthenticated && (
                        <div className="p-3 flex flex-col gap-2">
                          <button
                            onClick={() => {
                              router.push("/sign-up");
                              setmobileProfileOpen(false);
                              setIsOpen(false);
                            }}
                            className="w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition duration-150"
                          >
                            Sign In
                          </button>

                          <button
                            onClick={() => {
                              router.push("/sign-up");
                              setmobileProfileOpen(false);
                              setIsOpen(false);
                            }}
                            className="w-full border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 active:scale-95 transition duration-150"
                          >
                            Register
                          </button>
                        </div>
                      )}
                    </div>

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