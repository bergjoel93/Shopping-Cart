import localforage from "localforage";
/**
 * The purpose of this module is to handle the logic for the shopping cart.
 */

export async function getCart() {
  let cart = await localforage.getItem("cart");
  if (!cart) cart = [];
  return cart;
}

export async function addToCart(id, quantity) {
  let cart = getCart();
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
