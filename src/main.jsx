import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes";
import ErrorPage from "./error-page";
import Shop from "./routes/shop";
import ShoppingCart from "./routes/shoppingCart";
import Item from "./routes/item";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index></Index>,
          },
          {
            path: "/shop/item/:itemId",
            element: <Item></Item>,
          },
          {
            path: "/shop",
            element: <Shop></Shop>,
          },
          {
            path: "/shoppingCart",
            element: <ShoppingCart></ShoppingCart>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
