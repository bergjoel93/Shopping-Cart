/**
 * The purpose of this module is to fetch data from the fakestore api.
 *
 */
export async function getProducts() {
  const result = await fetch("https://fakestoreapi.com/products?limit=30"); // gets the response
  const data = await result.json(); // converts it to a json object.
  //console.log(data);
  return data;
}

export async function getProductsInCart(cart) {}

/**
 * get's a single product based on id.
 */
export async function getProduct(id) {
  const result = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!result) {
    throw new Error("No item found for", id);
  }
  const data = await result.json();
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
