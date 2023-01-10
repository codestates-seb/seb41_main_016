import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    *{
      box-sizing: border-box;
      outline: none;
      list-style: none;
      text-decoration: none;
    }
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));

const colorTheme = {
  darkBlack: "#000",
  mediumBlack: "#333",
  lightBlack: "#4a4a4a",
  darkGrey: "#999",
  mediumGrey: "#a4a4a4",
  lightGrey: "#ccc",
  white: "#fff",
  pointColor: "#20b2aa",
};

root.render(
  <ThemeProvider theme={colorTheme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
