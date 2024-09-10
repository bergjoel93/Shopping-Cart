import { useLoaderData, useFetcher } from "react-router-dom";
import { getCategories, getProducts } from "../products";
import { addToCart } from "../cart";
import ProductCard from "../components/productCard";
import "./shop.css";
import { Fragment } from "react";

export async function loader() {
  const products = await getProducts();
  const categories = await getCategories();
  return { products, categories };
}
/**
 * In React Router, this function is used to handle form submissions or other mutations (like adding to a cart) that are triggered by form elements with a 'method="post"'.
 * @param {Request} param0 - request: this is a Request object that contains all of the info about the http request, including form data, headers, method, etc.
 * @param
 * @returns
 */
export async function action({ request, params }) {
  const formData = await request.formData();
  const productId = Number(formData.get("id"));

  const quantity = Number(formData.get("quantity"));
  // logic to add to cart
  console.log("ProductId", productId, "Quantity", quantity);
  addToCart(productId, quantity);
  return null;
}

export default function Shop() {
  const { products, categories } = useLoaderData();

  return (
    <div className="p-5 bg-zinc-50 ">
      <div
        id="category-button-container"
        className="w-full flex gap-4 justify-center align-center"
      >
        {categories.map((category) => (
          <button
            key={category}
            className="rounded-full bg-slate-50 border-slate-200 border px-4 py-1 hover:bg-slate-300 transition ease-in-out delay-150"
          >
            {category}
          </button>
        ))}
      </div>
      <h1 className="text-3xl text-bold m-3">Products</h1>
      <div id="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}
