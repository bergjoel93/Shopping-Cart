import localforage from "localforage";

// Fetch the cart from localforage
export async function getCart() {
  let cart = await localforage.getItem("cart");
  if (!cart) cart = []; // If no cart exists, return an empty array
  return cart;
}

// Update the quantity of a specific item in the cart
export async function updateCart(productId, updates) {
  let cart = await getCart(); // Get the current cart

  // Find the item in the cart
  let itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    // If the item exists, update its properties with the provided updates
    cart[itemIndex] = { ...cart[itemIndex], ...updates };
  }

  // Save the updated cart back to localforage
  await localforage.setItem("cart", cart);

  // Return the updated cart
  return cart;
}

// Delete an item from the cart
export async function deleteItem(productId) {
  let cart = await getCart(); // Get the current cart

  // Filter out the item to be deleted
  const updatedCart = cart.filter((item) => item.id !== productId);

  // Save the updated cart back to localforage
  await localforage.setItem("cart", updatedCart);

  // Return the updated cart
  return updatedCart;
}
