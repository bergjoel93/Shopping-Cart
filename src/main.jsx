import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import Index from "./routes";
import ErrorPage from "./error-page";
import Shop, {
  loader as shopLoader,
  action as shopAction,
} from "./routes/shop";
import ShoppingCart, {
  loader as shoppingCartLoader,
} from "./routes/shoppingCart";
import Item, { loader as itemLoader } from "./routes/item";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
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
            loader: itemLoader,
          },
          {
            path: "/shop",
            element: <Shop></Shop>,
            loader: shopLoader,
            action: shopAction,
          },
          {
            path: "/shoppingCart",
            element: <ShoppingCart></ShoppingCart>,
            loader: shoppingCartLoader,
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
