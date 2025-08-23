import styled, { keyframes, css } from "styled-components";

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0%); }
`;
const slideOut = keyframes`
  from { transform: translateX(0%); }
  to   { transform: translateX(100%); }
`;

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 0px;
  min-height: 100vh;
  padding: 0; /* 불필요한 패딩 제거 */
  box-sizing: border-box; /* 패딩이 width에 포함되도록 설정 */
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 390px;
  flex-shrink: 0;
  padding-bottom: 200px;

  animation: ${slideIn} 320ms ease both;

  /* 나갈 때 애니메이션: <M.Container $leaving /> 로 제어 */
  ${(p) =>
    p.$leaving &&
    css`
      animation: ${slideOut} 280ms ease both;
    `}

  /* 안전영역(iOS notch) */
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: calc(200px + env(safe-area-inset-bottom, 0px));

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 21px;
  margin-top: 27px;
  width: 390px;
  text-align: left;
  padding-bottom: 11px;

  img {
    width: 10px;
    height: 22px;
    flex-shrink: 0;
  }
  img#back:active {
    transform: scale(0.94);
  }

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 19px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Menu = styled.div`
  width: 160px;
  height: 100vh;
  flex-shrink: 0;
  background: rgba(255, 79, 38, 0.1);
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  width: 140px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 14.96px;
  margin-left: 20px;
  position: relative;
  z-index: 1;

  img {
    width: 26.037px;
    height: 26.037px;
    flex-shrink: 0;
  }

  div {
    color: ${({ $active }) => ($active ? "#fff" : "#000")};
    transition: color 160ms ease;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const Items = styled.div`
  margin-top: 87px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const Highlight = styled.div`
  position: absolute;
  left: 12px;
  // margin-left: 20px;
  transition: top 220ms ease;
  z-index: 0;
  // margin-top: 140px;
  width: 160px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #ff4f26;
`;

export const Details = styled.div`
  margin-top: 91px;
  gap: 30px;
  display: flex;
  flex-direction: column;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

export const DetailRow = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
