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
  width: 390px;
  flex-shrink: 0;
  padding-bottom: 200px;
`;

export const Header = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: end;
  justify-content: space-between;
`;

export const Title = styled.div`
  margin-top: 6px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
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

export const Popup = styled.div`
  position: absolute;
  top: 60px; // 아이콘 기준 위치 조정
  right: 45px;
  width: 200px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(255, 79, 38, 0.8);
  display: flex;
  gap: 13px;
  flex-direction: column;
  padding-top: 18px;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const PopupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 19px;
  padding-right: 20px;

  img {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
`;

export const Hr = styled.div`
  width: 200px;
  height: 0.5px;
  background: #fff;
`;

export const Category = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  #recipe {
    color: #969696;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 195px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.2);
  }

  #purchase {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 195px;
    box-shadow: 0px 2px 0px 0px #ff4f26;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Body = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Date = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
  width: 390px;
  text-align: left;
  padding: 20px;
`;

export const Detail = styled.div`
  width: 390px;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 4px;
  align-items: center;
  justify-content: space-between;
`;

export const L = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  text-align: left;
  align-items: center;

  #circle {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #00b40f;
  }

  #date {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const R = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 10px;
  width: 390px;
  align-items: center;
`;

export const CDate = styled.div`
  width: 390px;
  padding-left: 20px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
`;

export const Component = styled.div`
  width: 350px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 남은 폭을 받기 위해 필수 */
`;

export const Ing = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
  align-items: center;

  display: flex;
  align-items: center;
  flex: 1 1 auto; /* 핵심: 남은 공간을 받음 */
  min-width: 0; /* 일부 브라우저에서 수축 허용 */

  &::after {
  content: "";
  flex: 1 1 auto;
  margin: 0 8px;

  /* 점선 커스텀 */
  height: 1px; /* 점선 두께 */
  background-image: repeating-linear-gradient(
    to right,
    #969696 0px,
    #969696 2px,        /* 점 길이 */
    transparent 8px  /* 점 간격 */
  );

  /* 세로 위치 맞추기 */
  align-self: center; /* 부모 flex 기준 중앙 정렬 */
}

  }
`;

export const Num = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Nav = styled.div`
  width: 390px;
  height: 64px;
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
  padding-bottom: 13px;
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

export const EmptyWrapper = styled.div`
  justify-content: center;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  img {
    margin-top: 160px;
    width: 165px;
    height: 199px;
    flex-shrink: 0;
    aspect-ratio: 165/199;
    opacity: 0.5; /* 👈 여기 추가! (0.0 ~ 1.0 사이) */
  }

  div {
    margin-left: 4px;
    margin-top: 30px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
