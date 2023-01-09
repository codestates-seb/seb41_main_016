import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import App from './App';

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    *{
      box-sizing: border-box;
      outline: none;
      list-style: none;
      text-decoration: none;
      font-family: 'Noto Sans KR', sans-serif;
      ::-webkit-scrollbar {
      display: none;
      }
    }
  }
  @font-face {
    font-family: 'Leferi Point Type';
    src: url('./src/fonts/LeferiPoint-Black.eot');
    src: local('./src/fonts/Leferi Point Type Black'), local('./src/fonts/LeferiPoint-Black'),
        url('./src/fonts/LeferiPoint-Black.eot?#iefix') format('embedded-opentype'),
        url('./src/fonts/LeferiPoint-Black.woff2') format('woff2'),
        url('./src/fonts/LeferiPoint-Black.woff') format('woff'),
        url('./src/fonts/LeferiPoint-Black.ttf') format('truetype'),
        url('./src/fonts/LeferiPoint-Black.svg#LeferiPoint-Black') format('svg');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
      font-family: 'Noto Sans KR', sans-serif;
      src: url('./src/fonts/NotoSansKR-Regular-Alphabetic.eot');
      src: url('./src/fonts/NotoSansKR-Regular-Alphabetic.eot?#iefix') format('embedded-opentype'),
          url('./src/fonts/NotoSansKR-Regular-Alphabetic.woff2') format('woff2'),
          url('./src/fonts/NotoSansKR-Regular-Alphabetic.woff') format('woff'),
          url('./src/fonts/NotoSansKR-Regular-Alphabetic.ttf') format('truetype'),
          url('./src/fonts/NotoSansKR-Regular-Alphabetic.svg#NotoSansKR-Regular-Alphabetic') format('svg');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'Noto Sans KR', sans-serif;
      src: url('./src/fonts/NotoSansKR-Bold-Alphabetic.eot');
      src: url('./src/fonts/NotoSansKR-Bold-Alphabetic.eot?#iefix') format('embedded-opentype'),
          url('./src/fonts/NotoSansKR-Bold-Alphabetic.woff2') format('woff2'),
          url('./src/fonts/NotoSansKR-Bold-Alphabetic.woff') format('woff'),
          url('./src/fonts/NotoSansKR-Bold-Alphabetic.ttf') format('truetype'),
          url('./src/fonts/NotoSansKR-Bold-Alphabetic.svg#NotoSansKR-Bold-Alphabetic') format('svg');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'Noto Sans KR', sans-serif;
      src: url('./src/fonts/NotoSansKR-Medium-Alphabetic.eot');
      src: url('./src/fonts/NotoSansKR-Medium-Alphabetic.eot?#iefix') format('embedded-opentype'),
          url('./src/fonts/NotoSansKR-Medium-Alphabetic.woff2') format('woff2'),
          url('./src/fonts/NotoSansKR-Medium-Alphabetic.woff') format('woff'),
          url('./src/fonts/NotoSansKR-Medium-Alphabetic.ttf') format('truetype'),
          url('./src/fonts/NotoSansKR-Medium-Alphabetic.svg#NotoSansKR-Medium-Alphabetic') format('svg');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
  } 
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

const colorTheme = {
  darkBlack: '#000',
  mediumBlack: '#333',
  lightBlack: '#4a4a4a',
  darkGrey: '#999',
  mediumGrey: '#a4a4a4',
  lightGrey: '#ccc',
  white: '#fff',
  pointColor: '#20b2aa',
};

root.render(
  <ThemeProvider theme={colorTheme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
