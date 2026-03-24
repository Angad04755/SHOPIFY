import { CartItem } from "@/types/typing";

const CART_KEY = "cart";
const isClient = typeof window !== "undefined";

export const loadItems = (): CartItem[] => {
  if (!isClient) return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveItems = (items: CartItem[]): void => {
  if (!isClient) return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const clearItems = (): void => {
  if (!isClient) return;
  localStorage.removeItem(CART_KEY);
};