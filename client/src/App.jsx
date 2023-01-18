import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/AllProducts";
import DetailedProduct from "./pages/DetailedProduct";
import WishLists from "./pages/WishLists";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchProducts from "./pages/SearchProducts";

const withLayout = (Component) => {
  return (
    <>
      <Header />
      <Component />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: withLayout(Main),
    errorElement: <NotFound />,
  },
  {
    path: "/category/:id",
    element: withLayout(AllProducts),
  },
  {
    path: "/rooms/:id",
    element: withLayout(DetailedProduct),
  },
  {
    path: "/wishlists",
    element: withLayout(WishLists),
  },
  {
    path: "/mypage/:id",
    element: withLayout(MyPage),
  },
  {
    path: "/:searchParams",
    element: withLayout(SearchProducts),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
