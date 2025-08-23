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
  font-weight: 600;
  line-height: normal;
`;

export const Image = styled.div`
  margin-top: 12px;
  width: 350px;
  height: 350px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;

  ${({ isUploaded }) =>
    isUploaded &&
    `
    border: none;
    background-color: transparent;
  `}
`;

export const PlusIcon = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  color: #969696;
`;

export const ImageText = styled.div`
  color: #969696;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

export const Button = styled.div`
  width: 350px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? "#c4c4c4" : "#ff4f26")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
`;
