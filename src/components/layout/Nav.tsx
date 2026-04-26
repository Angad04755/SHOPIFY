"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { HeartIcon, ShoppingCart, Menu, X, User, LogOut, TrashIcon, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { authenticated } from "../../../store/features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchBox from "../search/SearchBox";
import { toast } from "react-toastify";
import { Register } from "../../../store/features/auth/registerSlice";
import { usePathname } from "next/navigation";
import { CartItem } from "../../../store/types";
import { Appdispatch, RootState } from "../../../store/store";
import Modal from "../ui/Modal";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ProfileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  const dispatch = useDispatch<Appdispatch>();

  const items = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isRegistered = useSelector((state: any) => state.register.isRegistered);

  const totalQuantity = useMemo(
    () => items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [items]
  );

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  const show = () => setProfileOpen(true);
  const hide = () => setProfileOpen(false);
  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  const ModalContent = (
    <div className="w-[200px]">
      {isAuthenticated && isRegistered && (
        <div>
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 font-bold">Signed in</p>
          </div>
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={() => {
                dispatch(authenticated(false));
                setProfileOpen(false);
                toast.success("Signed out");
                setIsOpen(false);
                hideModal();
              }}
              className="font-semibold border-b border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
            >
              <LogOut size={15} /> Sign Out
            </button>
            <button
              onClick={() => {
                dispatch(authenticated(false));
                dispatch(Register(false));
                setProfileOpen(false);
                toast.success("Account Deleted");
                setIsOpen(false);
                hideModal();
              }}
              className="font-semibold border-t border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
            >
              <TrashIcon size={15} /> Delete Account
            </button>
          </div>
        </div>
      )}

      {!isAuthenticated && isRegistered && (
        <div className="flex flex-col">
          <button
            onClick={() => {
              router.push("/sign-up");
              setProfileOpen(false);
              setIsOpen(false);
              hideModal();
            }}
            className="w-full font-semibold border-b border-gray-200 text-gray-700 text-sm py-2 hover:bg-gray-50 transition duration-150 cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              dispatch(authenticated(false));
              dispatch(Register(false));
              setProfileOpen(false);
              toast.success("Account Deleted");
              setIsOpen(false);
              hideModal();
            }}
            className="font-semibold border-t border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
          >
            <TrashIcon size={15} /> Delete Account
          </button>
        </div>
      )}

      {!isAuthenticated && !isRegistered && (
        <div className="flex flex-col gap-2 p-3">
          <p className="text-xs text-center text-gray-500 font-bold">
            Welcome! Please create account.
          </p>
          <button
            onClick={() => {
              router.push("/sign-up");
              setProfileOpen(false);
              setIsOpen(false);
              hideModal();
            }}
            className="w-full border-t-2 font-semibold border-gray-200 text-gray-700 text-sm py-2 hover:bg-gray-200 transition duration-150 cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );

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
            <Image src="/images/logo.png" alt="Shopify logo" width={44} height={44} priority />
            <span className="text-lg md:text-xl lg:text-2xl font-bold">Shopify</span>
          </Link>

          <div className="hidden md:block w-full md:w-[420px] ml-[50px]">
            <SearchBox />
          </div>

          <div className="hidden md:flex lg:hidden items-center gap-4 flex-1 justify-end">
            <div onClick={() => router.push("/cart")}>
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute mt-[-35px] ml-[15px] w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            <button onClick={() => setIsOpen(true)}>
              <Menu size={26} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <HeartIcon className="cursor-pointer hover:text-red-500 transition-all duration-150" />

            <Link href="/cart" className="relative">
              <ShoppingCart className={`${pathname === "/cart" ? "fill-black" : "hover:scale-95 transition-all duration-150"}`} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <div onMouseEnter={show} onMouseLeave={hide} className="relative">
              <button className="w-9 h-9 rounded-full bg-indigo-200 hover:bg-indigo-300 flex items-center justify-center transition duration-150">
                <User size={18} className="text-indigo-800" />
              </button>

              <div className="absolute right-0">
                {ProfileOpen && (
                  <div className="w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[300]">
                    {isAuthenticated && isRegistered && (
                      <div>
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-xs font-bold text-gray-500">Signed in</p>
                        </div>
                        <div className="py-1 border-t border-gray-100">
                          <button
                            onClick={() => { dispatch(authenticated(false)); setProfileOpen(false); toast.success("Signed out"); }}
                            className="border-b font-semibold border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                          >
                            <LogOut size={15} /> Sign Out
                          </button>
                          <button
                            onClick={() => { dispatch(authenticated(false)); dispatch(Register(false)); setProfileOpen(false); toast.success("Account Deleted"); }}
                            className="border-t font-semibold border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                          >
                            <TrashIcon size={15} /> Delete Account
                          </button>
                        </div>
                      </div>
                    )}

                    {!isAuthenticated && isRegistered && (
                      <div className="flex flex-col">
                        <button
                          onClick={() => { router.push("/sign-up"); setProfileOpen(false); }}
                          className="border-b font-semibold w-full border-gray-200 text-gray-700 text-sm py-2 hover:bg-gray-200 transition duration-150 cursor-pointer"
                        >
                          Sign in
                        </button>
                        <button
                          onClick={() => { dispatch(authenticated(false)); dispatch(Register(false)); setProfileOpen(false); toast.success("Account Deleted"); }}
                          className="border-t font-semibold border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                        >
                          <TrashIcon size={15} /> Delete Account
                        </button>
                      </div>
                    )}

                    {!isAuthenticated && !isRegistered && (
                      <div className="p-3 flex flex-col gap-2">
                        <p className="text-xs text-gray-500 px-1 pb-1">Welcome! Please create account.</p>
                        <button
                          onClick={() => { router.push("/sign-up"); setProfileOpen(false); }}
                          className="w-full border-2 border-gray-200 text-gray-700 text-sm font-semibold py-2 rounded-lg hover:bg-gray-200 transition duration-150 cursor-pointer"
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

          {/* Mobile User Button */}
          <button onClick={showModal} className="md:hidden">
            <User size={25} color="black" />
          </button>

          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>

        </nav>

        <div className="md:hidden px-4 pb-3">
          <SearchBox />
        </div>
      </motion.header>
      <div>
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center"
        >
          
            <Modal onClose={hideModal}>
              {ModalContent}
            </Modal>
          </div>
      )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <aside className="fixed inset-0 z-[9999]">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

            <div className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-xl flex flex-col">
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

                <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-3 border p-3 rounded-lg">
                  <ShoppingCart />
                  <span>Cart</span>
                  {totalQuantity > 0 && (
                    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </div>

              <div className="flex flex-row">
                <button
                  className="mb-5 w-9 h-9 rounded-full ml-[10px] bg-indigo-200 hover:bg-indigo-300 transition duration-150 flex justify-center items-center"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <User className="text-indigo-500" size={20} />
                </button>
                <ChevronRight size={35} color="black" />
                <div>
                  {ProfileOpen && (
                    <div onClick={(e) => e.stopPropagation()} className="absolute mt-[-90px] w-fit bg-white rounded-xl shadow-xl border border-gray-100 z-[300]">
                      {isAuthenticated && isRegistered && (
                        <div>
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500 font-bold">Signed in</p>
                          </div>
                          <div className="py-1 border-t border-gray-100">
                            <button
                              onClick={() => { dispatch(authenticated(false)); setProfileOpen(false); toast.success("Signed out"); setIsOpen(false); }}
                              className="font-semibold border-b border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                            >
                              <LogOut size={15} /> Sign Out
                            </button>
                            <button
                              onClick={() => { dispatch(authenticated(false)); dispatch(Register(false)); setProfileOpen(false); toast.success("Account Deleted"); setIsOpen(false); }}
                              className="font-semibold border-t border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                            >
                              <TrashIcon size={15} /> Delete Account
                            </button>
                          </div>
                        </div>
                      )}

                      {!isAuthenticated && isRegistered && (
                        <div className="flex flex-col">
                          <button
                            onClick={() => { router.push("/sign-up"); setProfileOpen(false); setIsOpen(false); }}
                            className="w-full font-semibold border-b border-gray-200 text-gray-700 text-sm py-2 hover:bg-gray-50 transition duration-150 cursor-pointer"
                          >
                            Sign in
                          </button>
                          <button
                            onClick={() => { dispatch(authenticated(false)); dispatch(Register(false)); setProfileOpen(false); toast.success("Account Deleted"); setIsOpen(false); }}
                            className="border-t font-semibold border-gray-200 flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer active:scale-95"
                          >
                            <TrashIcon size={15} /> Delete Account
                          </button>
                        </div>
                      )}

                      {!isAuthenticated && !isRegistered && (
                        <div className="flex flex-col gap-2 p-3">
                          <p className="text-xs text-center text-gray-500 font-bold px-4">
                            Welcome! Please create account.
                          </p>
                          <button
                            onClick={() => { router.push("/sign-up"); setProfileOpen(false); setIsOpen(false); }}
                            className="w-full border-t-2 font-semibold border-gray-200 text-gray-700 text-sm py-2 hover:bg-gray-200 transition duration-150 cursor-pointer"
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
          </aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;