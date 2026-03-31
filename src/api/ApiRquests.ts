import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";

export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res.data;
}

export async function getAllProduct() {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=0`
  );
  return res.data.products;
}

export async function getProductsByCategory(
  category: ParamValue,
  limit: number,
  skip: number
) {
  const res = await axios.get(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  return {
    products: res.data.products,
    total: res.data.total,
  }
}

export async function searchProduct(query: string) {
  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return res.data.products;
}

export async function fetchProduct(id: ParamValue) {
  const res = await axios.get(
    `https://dummyjson.com/products/${id}`);
  return {
    product: res.data,
  }

};