import { useLoaderData } from "react-router-dom";
import { getProduct } from "../products";
import { QuantityBtn, AddToCartBtn } from "../components/buttons";

export async function loader({ params }) {
  const item = await getProduct(params.itemId);

  if (!item) {
    throw new Response("", {
      status: 404,
      statusText: "Item not found!",
    });
  }
  return { item };
}

export default function Item() {
  const { item } = useLoaderData();

  return (
    <div className="flex gap-4 max-w-[1200px] m-16 ">
      <img src={item.image} alt={item.title + " image"} className="h-[500px]" />
      <div className="flex flex-col gap-4 items-center m-5">
        <h1 className="font-bold text-xl">{item.title}</h1>
        <p className="m-t-4 text-sm">{item.description}</p>
        <div className="border rounded-lg flex flex-col gap-3 m-4 p-4 items-center align-center w-[250px]">
          <h2 className="font-bold text-3xl">
            {"$" + formatPrice(item.price)}
          </h2>
          <QuantityBtn></QuantityBtn>
          <AddToCartBtn></AddToCartBtn>
        </div>
      </div>
    </div>
  );
}

function formatPrice(str) {
  return parseFloat(str).toFixed(2);
}
