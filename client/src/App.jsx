import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/AllProducts";
import DetailedProduct from "./pages/DetailedProduct";
import WishLists from "./pages/WishLists";
import MyPage from "./pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
  },
  {
    path: "/category/:id",
    element: <AllProducts />,
  },
  {
    path: "/rooms/:id",
    element: <DetailedProduct />,
  },
  {
    path: "/wishlists",
    element: <WishLists />,
  },
  {
    path: "/mypage/:id",
    element: <MyPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
