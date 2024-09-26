import { useState, useEffect } from "react";

import { getCategories, getProducts } from "../products";

import ProductCard from "../components/productCard";
import "./shop.css";
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const { addToCart } = useOutletContext(); //  Access addToCart from the Outlet context
  const [allProducts, setAllProducts] = useState([]); // Full list of all products
  const [filteredProducts, setFilteredProducts] = useState([]); // set up a state for the products
  const [categories, setCategories] = useState([]); // set up state for categories.
  const [selectedCategory, setSelectedCategory] = useState("all"); // Currently selected category state.
  const [loading, setLoading] = useState(true); // set up a state for loading
  const [error, setError] = useState(null); // set up a state for an error.

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch products and categories
        const productsData = await getProducts();
        const categoriesData = await getCategories();

        setAllProducts(productsData); // Store the full list of products
        setFilteredProducts(productsData); // Initially, show all products
        setCategories(categoriesData); // Store categories

        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };
    fetchProductsAndCategories(); // Call the async function to fetch the products when the component mounts
  }, []);

  const handleCategoryFilter = (category) => {
    if (category === "all") {
      // If "All Products is selected, show all products.
      setFilteredProducts(allProducts);
    } else {
      // Otherwise, filter products by the selected category
      const filtered = allProducts.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <div> Loading products ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5 bg-zinc-50 ">
      <div
        id="category-button-container"
        className="w-full flex gap-4 justify-center align-center"
      >
        {/* Render category buttons here if needed */}
        <button
          onClick={() => handleCategoryFilter("all")}
          className="rounded-full bg-slate-50 border-slate-200 border px-4 py-1 hover:bg-slate-300 transition ease-in-out delay-150"
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className="rounded-full bg-slate-50 border-slate-200 border px-4 py-1 hover:bg-slate-300 transition ease-in-out delay-150"
          >
            {category}
          </button>
        ))}
      </div>
      <h1 className="text-3xl text-bold m-3">Products</h1>
      <div id="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}
