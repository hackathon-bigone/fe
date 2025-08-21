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
  align-items: end;

  img {
    width: 10px;
    height: 21px;
    flex-shrink: 0;
  }
`;

export const Title = styled.div`
  margin-top: 6px;
  margin-left: 19px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
`;

export const Category = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  #recipe {
    color: #000;
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
    box-shadow: 0px 2px 0px 0px #ff4f26;
  }

  #purchase {
    color: #969696;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 195px;
    box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 9px;
  gap: 10px;
  // min-height: 100vh;
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

export const Component = styled.div`
  padding: 10px 30px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Image = styled.div`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 5px;
  background: lightgray 50% / cover no-repeat;

  img {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 5px;
    background: lightgray 50% / cover no-repeat;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-left: 20px;
`;

export const Up = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
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
  margin-left: 50px;
`;

export const Down = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Icons = styled.div`
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

export const Date = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
