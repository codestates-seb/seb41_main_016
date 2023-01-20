import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { colorTheme } from "./assets/style/Theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./assets/style/GlobalStyle";
import Header from "./components/Header/Header";
import store from "./store/Store";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={colorTheme}>
          <GlobalStyle />
          <Header />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
