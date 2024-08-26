import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes";
import ErrorPage from "./error-page";
import Shop, { loader as shopLoader } from "./routes/shop";
import ShoppingCart from "./routes/shoppingCart";
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
            path: "/shop",
            element: <Shop></Shop>,
            loader: shopLoader,
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
