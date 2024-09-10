import localforage from "localforage";
import { getProducts } from "./products";
/**
 * The purpose of this module is to handle the logic for the shopping cart.
 */

export async function getItemsInCart() {
  const products = await getProducts(); // Fetch all products
  const cart = await getCart(); // Fetch the current cart
  console.log("cart", cart);
  console.log("products", products);
  // Map over the cart to get an array of products with their quantities
  const itemsInCart = cart
    .map((cartItem) => {
      // Find the matching product by id
      const product = products.find(
        (product) => Number(product.id) === Number(cartItem.id)
      );
      if (product) {
        // Return a new object combining product data with the quantity from the cart
        return {
          ...product,
          quantity: cartItem.quantity,
        };
      }
      return null;
    })
    .filter((item) => item !== null); // Remove any null values in case of unmatched products

  console.log(itemsInCart);

  return itemsInCart;
}

export async function getCartCount() {
  let cartCount = 0;
  const cart = await getCart();
  cart.forEach((item) => {
    cartCount += Number(item.quantity);
  });
  return cartCount;
}

export async function getCart() {
  let cart = await localforage.getItem("cart");
  if (!cart) cart = [];
  return cart;
}

export async function addToCart(id, quantity) {
  let cart = await getCart();
  // Check if the item already exists in the cart.
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    // If the item exists, increase the quantity
    existingItem.quantity += quantity;
  } else {
    // cIf the item doesn't exist, add it to the cart
    cart.push({ id, quantity });
  }
  await setCart(cart);
}

export async function setCart(cart) {
  return localforage.setItem("cart", cart);
}

export async function deleteItem(id) {
  let cart = await localforage.getItem("cart");
  let index = cart.findIndex((item) => item.id === id);
  if (index > -1) {
    cart.splice(index, 1);
    await setCart(cart);
    return true;
  }
  return false;
}

export async function updateCart(id, updates) {
  let cart = await localforage.getItem("cart");
  let item = cart.find((item) => item.id === id);
  if (!item) throw new Error("No item found for", id);
  Object.assign(item, updates);
  await setCart(cart);
  return item;
}
