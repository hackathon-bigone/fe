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
  align-items: center;
  justify-content: center;
  background: #fff;
  width: 393px;
  flex-shrink: 0;
  padding-bottom: 200px;
`;

export const Logo = styled.div`
  color: #ff4f26;
  font-family: Pretendard;
  font-size: 50px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin: 60px;
`;

export const Input = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  width: 350px;
  height: 50px;
  display: flex;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;

  img {
    margin: 0px 10px;
  }

  input {
    width: 280px;
    border: none;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  input:focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-within {
    border-color: #ff4f26;
  }
`;

export const LoginBtn = styled.div`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #c4c4c4;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SignUpBtn = styled.div`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
