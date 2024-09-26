import { NavLink, Outlet, Link } from "react-router-dom";
import { RiShoppingCartFill } from "@remixicon/react";
import { useState, useEffect } from "react";
import { getCart } from "../cart";

import localforage from "localforage";

export default function Root() {
  const [cart, setCart] = useState([]);

  // create a new cart. When addToCart is called, it takes in the product ID and then extracts that product. Then it adds that product to the cart array, and then adds a new property, quantity.

  const addToCart = async (product, quantity) => {
    console.log(product, "Has been added to cart!");
    let cart = await getCart();

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product already exists, just update its quantity.
      existingProduct.quantity += quantity;
    } else {
      // If the cart is empty or the product doesn't exist, add it with the quantity.
      cart = [...cart, { ...product, quantity }]; // Append the product with the quantity as a new property
    }

    // Update the cart in local forage
    await localforage.setItem("cart", cart);

    //Update the state with the new cart
    setCart(cart);
  };

  // Calculate the total number of items in the cart
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Load the cart from localforage when the component mounts
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await getCart();
      if (savedCart) {
        setCart(savedCart);
      }
    };
    loadCart();
  }, []); // Empty dependency array ensures this runs only on mount

  // Save the cart to localforage whenever it changes
  useEffect(() => {
    setCart(cart);
  }, [cart]); // This effect runs whenever the cart changes

  return (
    <div className="w-full h-full">
      <nav className="w-full h[72px] bg-zinc-800 text-zinc-200 p-2 flex flex-row justify-between items-center">
        <Link to={`/`}>
          <h1 className="mx-4 text-3xl">Shopping Cart</h1>
        </Link>

        <div className="flex mx-6 gap-7 items-center ">
          <NavLink
            to={`shop/`}
            className={({ isActive }) =>
              `text-xl underline-effect text-white hover:text-white ${
                isActive ? "active" : ""
              }`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              `text-xl underline-effect text-white hover:text-white ${
                isActive ? "active" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={`shoppingCart/`}
            // className="flex gap-2  hover:border-b-2 border-white"
            className={({ isActive }) =>
              `flex gap-2 p-1 underline-effect text-white hover:text-white ${
                isActive ? "active" : ""
              }`
            }
          >
            <RiShoppingCartFill></RiShoppingCartFill>
            {cartCount > 0 && <span>({cartCount})</span>}
          </NavLink>
        </div>
      </nav>
      <div id="details" className="w-full h-full">
        <Outlet context={{ addToCart, cart, setCart }}></Outlet>{" "}
        {/* Passing addToCart and cart as context */}
      </div>
    </div>
  );
}
