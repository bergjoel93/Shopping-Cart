import { getProducts, getProduct } from "../products";

jest.mock("../products", () => ({
  getProducts: jest.fn(),
  getProduct: jest.fn(),
}));

describe("Product Functions", () => {
  test("getProducts should return a list of products", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ];

    getProducts.mockResolvedValueOnce(mockProducts);

    const products = await getProducts();
    expect(products).toEqual(mockProducts);
  });

  test("getProduct should return a single product based on ID", async () => {
    const mockProduct = { id: 1, title: "Product 1" };

    getProduct.mockResolvedValueOnce(mockProduct);

    const product = await getProduct(1);
    expect(product).toEqual(mockProduct);
  });
});
