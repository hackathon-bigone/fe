// /mnt/data/GlobalStyles.jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    max-width: 100vw;  /* ✅ 화면보다 넓어지는 요소 방지 */
    overflow-x: hidden; /* ✅ 가로 스크롤 강제 차단 */
  }

  body {
    background-color: #f0f0f0;
    height: 100%;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', sans-serif;
    font-weight: 400;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
