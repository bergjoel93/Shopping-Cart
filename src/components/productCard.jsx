export default function ProductCard({ product }) {
  return (
    <div className="w[250px] rounded flex flex-col p-3 shadow bg-white items-center align-center">
      <img
        src={product.image}
        alt={product.title + " image"}
        className="h[280px] max-w-64 object-contain"
      />
      <h2 className="font-bold ">{product.title}</h2>
      <div>{"$" + product.price}</div>
      <div>Quantity button here</div>
      <button>Add To Cart</button>
    </div>
  );
}
