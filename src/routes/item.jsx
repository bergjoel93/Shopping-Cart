//import { QuantityInput } from "../components/buttons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../products";
import { QuantityBtn } from "../components/buttons";

export default function Item() {
  const { itemId } = useParams(); // Retrieve the itemId from the URL
  const [item, setItem] = useState(null); // State to hold the product details
  const [loading, setLoading] = useState(true); // state to manage loading status
  const [error, setError] = useState(null); // state to manage error

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const product = await getProduct(itemId); // fetch product by ID

        setItem(product); // set the fetch product in state.
        setLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  if (loading) {
    return <div>Loading product details...</div>; // Display a loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Display an error message if something goes wrong
  }

  if (!item) {
    return <div>No product found</div>; // Handle the case where no product is found
  }

  return (
    <div className="flex justify-center">
      <div className="flex gap-4 max-w-[800px] m-16 ">
        <img
          src={item.image}
          alt={item.title + " image"}
          className="h-[400px]"
        />
        <div className="flex flex-col gap-4 items-center m-5">
          <h1 className="font-bold text-3xl">{item.title}</h1>
          <p className="m-t-4 text-lg">{item.description}</p>
          <div className="border rounded-lg flex flex-col gap-3 m-4 p-4 items-center align-center w-[250px]">
            <h2 className="font-bold text-3xl">
              {"$" + formatPrice(item.price)}
            </h2>
            <QuantityBtn />
            <button className="bg-slate-800 p-2 rounded-lg text-white font-bold cursor hover:bg-sky-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPrice(str) {
  return parseFloat(str).toFixed(2);
}

/**
 * Notes:
 * We want to implement the Item page so that it properly fetches and displays the details of a specific product based on its id.
 * 1. use the hook useParams to access segments of the URL, such as itemId.
 * 2. Fetch the product data. Once you have the itemId, use it to fetch the corresponding product details using the getProduct function from the product.js file.
 * 3. Manage loding and error states: just like we did in the shop page. Handle laoding and error states while fetching the product data.
 * 4. Display the product data:
 */
