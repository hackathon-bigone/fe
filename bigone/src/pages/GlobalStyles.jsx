// /mnt/data/GlobalStyles.jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@100;300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f0f0f0; /* 원하는 회색으로 설정 */
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;  /* 화면 높이를 100%로 설정 */
    overflow-x: hidden;  /* 가로 스크롤 방지 */
    font-family: 'Instrument Sans', sans-serif;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
