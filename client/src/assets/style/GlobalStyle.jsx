import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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

  /* @font-face {
      font-family: 'Noto Sans KR', sans-serif;
      src: url('../fonts/NotoSansKR-Regular-Alphabetic.eot');
      src: url('../fonts/NotoSansKR-Regular-Alphabetic.eot?#iefix') format('embedded-opentype'),
          url('../fonts/NotoSansKR-Regular-Alphabetic.woff2') format('woff2'),
          url('../fonts/NotoSansKR-Regular-Alphabetic.woff') format('woff'),
          url('../fonts/NotoSansKR-Regular-Alphabetic.ttf') format('truetype'),
          url('../fonts/NotoSansKR-Regular-Alphabetic.svg#NotoSansKR-Regular-Alphabetic') format('svg');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'Noto Sans KR', sans-serif;
      src: url('../fonts/NotoSansKR-Bold-Alphabetic.eot');
      src: url('../fonts/NotoSansKR-Bold-Alphabetic.eot?#iefix') format('embedded-opentype'),
          url('../fonts/NotoSansKR-Bold-Alphabetic.woff2') format('woff2'),
          url('../fonts/NotoSansKR-Bold-Alphabetic.woff') format('woff'),
          url('../fonts/NotoSansKR-Bold-Alphabetic.ttf') format('truetype'),
          url('../fonts/NotoSansKR-Bold-Alphabetic.svg#NotoSansKR-Bold-Alphabetic') format('svg');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'Noto Sans KR', sans-serif;
      src: url('../fonts/NotoSansKR-Medium-Alphabetic.eot');
      src: url('../fonts/NotoSansKR-Medium-Alphabetic.eot?#iefix') format('embedded-opentype'),
          url('../fonts/NotoSansKR-Medium-Alphabetic.woff2') format('woff2'),
          url('../fonts/NotoSansKR-Medium-Alphabetic.woff') format('woff'),
          url('../fonts/NotoSansKR-Medium-Alphabetic.ttf') format('truetype'),
          url('../fonts/NotoSansKR-Medium-Alphabetic.svg#NotoSansKR-Medium-Alphabetic') format('svg');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
  }  */
`;

export default GlobalStyle;
