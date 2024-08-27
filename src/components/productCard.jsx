import { NavLink } from "react-router-dom";
import { QuantityBtn, AddToCartBtn } from "./buttons";
export default function ProductCard({ product }) {
  return (
    <div className="w[250px] rounded-lg flex flex-col gap-2 p-4 shadow-xl bg-white items-center align-center">
      <NavLink to={"item/" + product.id}>
        <img
          src={product.image}
          alt={product.title + " image"}
          className="h-[280px] max-w-56 object-contain"
        />
        <h2 className="font-bold text-center">{product.title}</h2>
        <div className="text-xl font-bold text-center">
          {"$" + formatPrice(product.price)}
        </div>
      </NavLink>
      {/* quantity controller */}
      <QuantityBtn></QuantityBtn>
      {/* Add to cart button */}
      <AddToCartBtn></AddToCartBtn>
    </div>
  );
}
function formatPrice(str) {
  return parseFloat(str).toFixed(2);
}
