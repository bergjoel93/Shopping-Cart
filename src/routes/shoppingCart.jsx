import { useLoaderData } from "react-router-dom";
import { getCart, getItemsInCart } from "../cart";
import { getProducts } from "../products";
import { Rating } from "react-simple-star-rating";
import { QuantityBtn } from "../components/buttons";
import { RiDeleteBin6Line } from "@remixicon/react";

export async function loader() {
  const itemsInCart = await getItemsInCart();
  console.log(itemsInCart);
  return { itemsInCart };
}

export async function action() {}

export default function ShoppingCart() {
  const { itemsInCart } = useLoaderData();
  const product1 = itemsInCart[0];
  //console.log(product1);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold border-b-4 border-zinc-800 pb-2">
        Shopping Cart
      </h1>
      <div id="cart-container" className="flex flex-col gap-5 m-3">
        {itemsInCart.map((item) => (
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
              <QuantityBtn quantity={item.quantity} />
            </div>
            <div>
              <button className="cursor-pointer hover:text-red-500">
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
