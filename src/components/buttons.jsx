// export function QuantityInput({ productId, initialQuantity = 1 }) {
//   const [quantity, setQuantity] = useState(initialQuantity);

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const handleDecrease = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleSubmit = () => {
//     //setQuantity(1);
//   };

//   return (
//     <Form method="post">
//       <input type="hidden" value={productId} name="id" />
//       <input type="hidden" value={quantity} name="quantity" />
//       <div className="flex flex-col gap-2">
//         <QuantityBtn
//           quantity={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           increaseQuantity={handleIncrease}
//           decreaseQuantity={handleDecrease}
//         ></QuantityBtn>
//         <AddToCartBtn onClick={handleSubmit}></AddToCartBtn>
//       </div>
//     </Form>
//   );
// }

export function AddToCartBtn({ onClick }) {
  return (
    <button
      type="submit"
      className="bg-slate-800 p-2 rounded-lg text-white font-bold cursor hover:bg-sky-700 transition"
    >
      Add To Cart
    </button>
  );
}

export function QuantityBtn({
  quantity,
  onChange = null,
  increaseQuantity,
  decreaseQuantity,
}) {
  const quantBtns = "p-2 hover:bg-slate-400 transition";
  return (
    <div className="flex align-center justify-center shadow-md rounded-lg bg-slate-200 w-24">
      <button
        type="button"
        className={quantBtns + "rounded-l-lg hover:rounded-l-lg"}
        onClick={decreaseQuantity}
      >
        &mdash;
      </button>
      <input
        className="w-10 h-10 p-1 text-center bg-white outline-none"
        type="text"
        name="quantityDisplay"
        value={quantity}
        onChange={onChange}
        min="1"
        readOnly
      />
      <button
        type="button"
        className={quantBtns + "rounded-r-lg hover:rounded-r-lg"}
        onClick={increaseQuantity}
      >
        &#xff0b;
      </button>
    </div>
  );
}
