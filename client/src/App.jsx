import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./assets/style/GlobalStyle";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Header />
        <Outlet />
        <Footer />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Suspense>
  );
}
