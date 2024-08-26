import { useLoaderData, useFetcher } from "react-router-dom";
import { getProducts } from "../products";
import ProductCard from "../components/productCard";
import "./shop.css";

export async function loader() {
  const products = await getProducts();
  return { products };
}

export default function Shop() {
  const { products } = useLoaderData();

  return (
    <div className="m-5 ">
      <h1 className="text-3xl text-bold">Products</h1>
      <div id="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}
