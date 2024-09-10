import { NavLink, Outlet, Link, useLoaderData } from "react-router-dom";
import { getCartCount } from "../cart";
import { RiShoppingCartFill } from "@remixicon/react";
import { useState, useEffect } from "react";

export async function loader() {
  const cartCount = await getCartCount();
  console.log("cartCount:", cartCount);
  return { cartCount };
}

export default function Root() {
  const { cartCount } = useLoaderData();

  useEffect(() => {});

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
            {cartCount}
          </NavLink>
        </div>
      </nav>
      <div id="details" className="w-full h-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
