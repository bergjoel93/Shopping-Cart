import { NavLink, Outlet } from "react-router-dom";
import { RiShoppingCartFill } from "@remixicon/react";
import { useState } from "react";

export default function Root() {
  const cartCount = 0;

  return (
    <div className="w-full h-full">
      <nav className="w-full h[72px] bg-zinc-800 text-zinc-200 p-2 flex flex-row justify-between items-center">
        <h1 className="mx-4 text-3xl">Shopping Cart</h1>
        <div className="flex mx-6 gap-7 items-center ">
          <NavLink to={`shop/`} className="text-xl">
            Shop
          </NavLink>
          <NavLink to={`/`} className="text-xl">
            Home
          </NavLink>
          <NavLink to={`shoppingCart/`} className="flex gap-2">
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
