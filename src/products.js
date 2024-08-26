export async function getProducts() {
  const result = await fetch("https://fakestoreapi.com/products?limit=30"); // gets the response
  const data = await result.json(); // converts it to a json object.

  return data;
}

export async function getCategories() {
  const result = await fetch("https://fakestoreapi.com/products/categories"); // gets the response
  const data = await result.json(); // converts it to a json object.
  return data;
}

export async function getProductsByCategory(category) {
  const result = fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = (await result).json();
  return data;
}
