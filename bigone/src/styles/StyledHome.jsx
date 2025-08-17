import { styled } from "styled-components";

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
  width: 393px;
  flex-shrink: 0;
  padding-bottom: 200px;
`;

export const Header = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  #logo {
    width: 91px;
    height: 32px;
    flex-shrink: 0;
  }
`;

export const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  #scrap {
    width: 23px;
    height: 22px;
    flex-shrink: 0;
  }

  #bar {
    width: 21px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export const Up = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 5px;
`;

export const Date = styled.div`
  width: 390px;
  text-align: left;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
`;

export const Box = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(255, 79, 38, 0.1);
`;

export const BUp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;

  #detail {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  #product {
    color: #000;
    text-align: right;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const BDown = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  img {
    width: 109.712px;
    height: 109.712px;
    transform: scaleX(-1) rotate(10deg); /* hover 시 회전 각도 변경 */
    flex-shrink: 0;
    margin-left: 7px;
  }

  #date {
    margin-right: 20px;
    color: #ff4f26;
    font-family: Pretendard;
    font-size: 110px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: -6px;
  }
`;

export const Popular = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 390px;
  align-items: center;
`;

export const PTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
  width: 390px;
  padding-left: 20px;
  text-align: left;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 6px;
`;

export const Component = styled.div`
  width: 390px;
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: row;
  justity-content: center;
  align-items: center;
`;

export const Top = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
`;

export const PDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 341px;
`;

export const Image = styled.div`
  margin-left: 21px;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 5px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

  img {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 5px;
    background: url(<path-to-image>) lightgray 0px -36.236px / 100% 150% no-repeat;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CUp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 20px;
`;

export const CTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 167px;
`;

export const Scrap = styled.div`
  width: 23px;
  height: 22px;
  flex-shrink: 0;
`;

export const Down = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  #heart {
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }

  #comment {
    margin-left: 10px;
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }

  #hnum {
    margin-left: 5px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  #cnum {
    margin-left: 5px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const CDate = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Nav = styled.div`
  width: 390px;
  height: 104px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  padding-top: 15px;
  padding-bottom: 43px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 50px;
`;

export const NHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NRefri = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 21.406px;
    height: 28.286px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NRecipe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28.071px;
    height: 28.065px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NPur = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 25.356px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NMy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
