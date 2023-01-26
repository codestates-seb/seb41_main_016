import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Main from "./pages/Main/Main";
import AllProducts from "./pages/AllProducts/AllProducts";
import DetailedProduct from "./pages/DetailedProduct/DetailedProduct";
import WishLists from "./pages/WishLists/WishLists";
import MyPage from "./pages/MyPage/MyPage";
import SearchProducts from "./pages/SearchProducts/SearchProducts";
import { colorTheme } from "./assets/style/Theme";
import { ThemeProvider } from "styled-components";
import KakaoLogin from "./pages/KakaoLogin";
import Kakao from "./pages/Kakao";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Main /> },
      { path: "/category/:id", element: <AllProducts /> },
      { path: "/rooms/:id", element: <DetailedProduct /> },
      { path: "/wishlists", element: <WishLists /> },
      { path: `/member/:id/mypage`, element: <MyPage /> },
      { path: "/:searchParams", element: <SearchProducts /> },
      { path: "/auth/kakao/callback", element: <KakaoLogin /> },
      { path: "/payment/success", element: <Kakao /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={colorTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
