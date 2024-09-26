import { Link } from "react-router-dom";
import { useState } from "react";
import { QuantityBtn } from "./buttons";

export default function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="w[250px] rounded-lg flex flex-col gap-2 p-4 shadow-xl bg-white items-center align-center">
      <Link to={"item/" + product.id}>
        <img
          src={product.image}
          alt={product.title + " image"}
          className="h-[280px] max-w-56 object-contain"
        />
        <h2 className="font-bold text-center">{product.title}</h2>
        <div className="text-xl font-bold text-center">
          {"$" + formatPrice(product.price)}
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        <QuantityBtn
          quantity={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          increaseQuantity={handleIncrease}
          decreaseQuantity={handleDecrease}
        ></QuantityBtn>
        <button
          onClick={() => handleAddToCart(product, quantity)}
          className="bg-slate-800 p-2 rounded-lg text-white font-bold cursor hover:bg-sky-700 transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
function formatPrice(str) {
  return parseFloat(str).toFixed(2);
}
