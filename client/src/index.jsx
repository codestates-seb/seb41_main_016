import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { colorTheme } from "./assets/style/Theme";
import { ThemeProvider } from "styled-components";
import store from "./store/Store";
import { Provider } from "react-redux";

const Main = lazy(() => import("./pages/Main/Main"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const DetailedProduct = lazy(() =>
    import("./pages/DetailedProduct/DetailedProduct")
);
const AllProducts = lazy(() => import("./pages/AllProducts/AllProducts"));
const WishLists = lazy(() => import("./pages/WishLists/WishLists"));
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
const KakaoLogin = lazy(() => import("./pages/KakaoLogin"));
const SearchProducts = lazy(() =>
    import("./pages/SearchProducts/SearchProducts")
);

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
            { path: `/members`, element: <MyPage /> },
            { path: "/auth/kakao/callback", element: <KakaoLogin /> },
            { path: "/:searchParams", element: <SearchProducts /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={colorTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
