import { getCartCount, setCart } from "../cart";
import localforage from "localforage";

jest.mock("localforage");

describe("Cart Functions", () => {
  beforeEach(() => {
    localforage.getItem.mockClear();
    localforage.setItem.mockClear();
  });

  test("getCartCount should return the correct count of items in the cart", async () => {
    const mockCart = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ];

    localforage.getItem.mockResolvedValueOnce(mockCart);

    const cartCount = await getCartCount();
    expect(cartCount).toBe(3);
  });

  test("getCartCount should return 0 if the cart is empty", async () => {
    localforage.getItem.mockResolvedValueOnce([]);

    const cartCount = await getCartCount();
    expect(cartCount).toBe(0);
  });
});
