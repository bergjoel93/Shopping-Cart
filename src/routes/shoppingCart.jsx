import { useState, useEffect } from "react";
import { getCart, updateCart, deleteItem } from "../cart";
import { useOutletContext } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { QuantityBtn } from "../components/buttons";
import { RiDeleteBin6Line } from "@remixicon/react";

export default function ShoppingCart() {
  const { cart, setCart } = useOutletContext(); // Access cart and setCart from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData);
        console.log(cart);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products in cart.");
        setLoading(false);
      }
    };
    fetchCart();
  }, [setCart]);

  // Handle quantity increase
  const handleIncrease = async (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    await updateCart(item.id, { quantity: updatedItem.quantity });
    setCart((prevItems) =>
      prevItems.map((i) => (i.id === item.id ? updatedItem : i))
    );
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      await updateCart(item.id, { quantity: updatedItem.quantity });
      setCart((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? updatedItem : i))
      );
    }
  };

  // Handle item deletion
  const handleDelete = async (item) => {
    await deleteItem(item.id); // Assume deleteItem handles removing from localforage
    setCart((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  if (loading) {
    return <div> Loading products ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold border-b-4 border-zinc-800 pb-2">
        Shopping Cart
      </h1>
      <div id="cart-container" className="flex flex-col gap-5 m-3">
        {cart.map((item) => (
          <div
            id="item-card"
            key={item.id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-6 items-center"
          >
            <img src={item.image} alt="" className="w-[110px]" />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="font-bold text-xl">{item.title}</h2>
              <div className="">
                <Rating
                  emptyStyle={{ display: "flex" }}
                  SVGstyle={{ display: "inline-block", marginBottom: 10 }}
                  style={{ marginBottom: -10 }}
                  initialValue={item.rating.rate}
                  readonly={true}
                  allowFraction={true}
                  size={16}
                />
              </div>

              {/* Add a delete button */}
            </div>
            <div className="flex flex-col gap-1  items-center align-center">
              <div className="text-2xl font-bold text-center">
                {"$" + formatPrice(item.price)}
              </div>
              <QuantityBtn
                quantity={item.quantity}
                increaseQuantity={() => handleIncrease(item)}
                decreaseQuantity={() => handleDecrease(item)}
              />
            </div>
            <div>
              <button
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(item)}
              >
                <RiDeleteBin6Line size={32} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatPrice(str) {
  return parseFloat(str).toFixed(2);
}
