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
  align-items: center;

  img {
    width: 10px;
    height: 22px;
    flex-shrink: 0;
  }

  div {
    margin-left: 19px;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const Body = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: sspace-between;
  padding: 25px 20px 14px 20px;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  #circle {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #00b40f;
  }

  #all {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const Delete = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Title = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: row;

  #name {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  #num {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 81px;
  }

  #date {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 44px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Name = styled.div`
  width: 110px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 16px 10px 16px 10px;

  input {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    outline: none;
    width: 80px;
    text-align: left;
  }
`;
export const Num = styled.div`
  width: 60px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 16px 10px 16px 10px;

  input {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    outline: none;
    width: 35px;
    text-align: left;
  }
`;

export const Date = styled.div`
  width: 160px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 16px 10px 16px 10px;

  input {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    outline: none;
    width: 130px;
    text-align: left;
  }
`;

export const Enter = styled.div`
  width: 390px;
  height: 104px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 20px 20px 44px 20px;
`;

export const Button = styled.div`
  border-radius: 5px;
  background: #ff4f26;
  width: 350px;
  height: 40px;
  flex-shrink: 0;
  text-align: center;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
  align-items: center;
  justify-content: center;
`;
