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
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Detail = styled.div`
  margin-top: 14px;
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
    margin-left: 44px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  position: relative;
`;

export const Name = styled.div`
  width: 110px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    // margin-left: 10px;
    width: 90px;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
    color: black;
  }
`;
export const Num = styled.div`
  width: 60px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 40px;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
    color: black;
  }
`;
export const Date = styled.div`
  width: ${({ hasDelete }) => (hasDelete ? "140px" : "160px")};
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 500;
    border: none;
    outline: none;
    color: black;
    background: transparent;
    padding-left: 10px;
  }
`;

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const Plus = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 15px;
  align-items: center;
  justify-content: center;

  img {
    width: 25px;
    height: 25px;
    flex-shrink: 0;
  }

  div {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const Button = styled.div`
  margin-top: 30px;
  width: 350px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${({ active }) => (active ? "#ff4f26" : "#c4c4c4")};
  color: #fff;
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
  cursor: ${({ active }) => (active ? "pointer" : "default")};
  transition: background-color 0.3s ease;
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
