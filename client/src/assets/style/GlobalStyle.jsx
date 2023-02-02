import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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
      user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    }
    .my-swal {
      z-index: 6000;
    }
    .icon-class {
      font-size: 10px !important;
    }
    .swal2-success-line-long{
      left:5px;
    }
    .swal2-x-mark-line-left{
      left:1.3px !important;
      top: 6.1px !important;
    }

    .swal2-x-mark-line-right{
      left:1.3px !important;
      top: 6.2px !important;
    }
  }

`;

export default GlobalStyle;
