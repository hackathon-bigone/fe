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
  margin-top: 15px;
  width: 390px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Field = styled.div`
  margin-top: 12px;
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.3);
  padding: 16px 10px 16px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  input {
    background: transparent;
    width: 100%;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
  }

  img {
    width: 21.532px;
    height: 19.5px;
    flex-shrink: 0;
  }
`;

export const NTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;
`;

export const NField = styled.div`
  margin-top: 12px;
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 10px 16px 10px;

  input {
    background: transparent;
    width: 100%;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
  }

  img {
    width: 21.532px;
    height: 19.5px;
    flex-shrink: 0;
  }
`;

export const NCheck = styled.div`
  margin-top: 12px;
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 10px 16px 10px;

  input {
    background: transparent;
    width: 100%;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
    outline: none;
  }

  img {
    width: 21.532px;
    height: 19.5px;
    flex-shrink: 0;
  }
`;

export const Announce = styled.div`
  color: #969696;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 10px;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 310px;
  height: 160px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  //   gap: 16px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 13px;
`;

export const ModalActions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  margin-top: 35px;

  & > button {
    width: 130px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  & > button:first-child {
    background: #fff;
    border: 1px solid #ff4f26;
    color: #ff4f26;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  & > button:last-child {
    background: #ff4f26;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
  }
`;

export const Button = styled.div`
  width: 390px;
  height: 100px;
  flex-shrink: 0;
  background: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;

  /* 하단 고정 스타일 */
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); /* 가로 가운데 정렬 */
`;
