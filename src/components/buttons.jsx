export function AddToCartBtn() {
  return (
    <button className="bg-sky-500 p-2 rounded-lg text-white font-bold cursor hover:bg-sky-700 transition">
      Add To Cart
    </button>
  );
}

export function QuantityBtn() {
  const quantBtns = "p-3 hover:bg-slate-400  transition";
  return (
    <div className="flex items-center align-center shadow-md rounded-lg bg-slate-200">
      <button className={quantBtns + "rounded-l-lg hover:rounded-l-lg"}>
        &mdash;
      </button>
      <input
        className="w-12 h-12 p-1 text-md text-center bg-white outline-none"
        type="text"
        defaultValue="1"
      />
      <button className={quantBtns + "rounded-r-lg hover:rounded-r-lg"}>
        &#xff0b;
      </button>
    </div>
  );
}
