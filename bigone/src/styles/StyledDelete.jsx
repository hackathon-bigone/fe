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
  // margin-top: 10px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px 20px 14px 20px;
  justify-content: space-between;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

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
    margin-left: 30px;
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
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  align-items: center;
`;

export const Check = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid #ff4f26;
  background-color: ${({ checked }) => (checked ? "#ff4f26" : "#fff")};
  cursor: pointer;
`;

export const Name = styled.div`
  width: 101px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 14px 10px 16px 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Num = styled.div`
  width: 55px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 14px 10px 16px 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Date = styled.div`
  width: 146px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 14px 10px 16px 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Enter = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: 104px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 20px 20px 44px 20px;
  z-index: 100; // 다른 컴포넌트보다 위에 보이게
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const All = styled.div`
  width: 170px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #ff4f26;
  background: #fff;
  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const Del = styled.div`
  width: 170px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #ff4f26;
  background: ${({ selected }) => (selected ? "#ff4f26" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#ff4f26")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  width: 300px;
  text-align: center;

  p {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  div {
    margin-top: 15px;
    color: #969696;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const ModalButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  button {
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }

  button:first-child {
    width: 130px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1px solid #ff4f26;
    background: #fff;
    color: #ff4f26;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  button:last-child {
    background-color: #ff4f26;
    color: #fff;
    width: 130px;
    height: 50px;
    flex-shrink: 0;
  }
`;
