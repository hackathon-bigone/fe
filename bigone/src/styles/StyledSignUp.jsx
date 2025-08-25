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
  padding: 17px; /* 아이콘 여백 조절으로 인해 변경 */
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
  margin: 0 15px;
  gap: 20px;
  align-items: center;

  #back {
    width: 10px;
    height: 21px;
  }
`;

export const InputCon = styled.div`
  padding: 10px 30px;
  flex-direction: row;
  position: relative;

  #title {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  input {
    margin-top: 12px;
    margin-bottom: 10px;
    padding: 15px;
    width: 100%;
    height: 50px;
    flex-shrink: 0;
    border-radius: 5px;
    background: rgba(196, 196, 196, 0.3);
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid #fff;
  }

  input:focus {
    outline: none;
    box-shadow: none;
    border-color: #ff4f26;
  }

  img {
    position: absolute;
    right: 50px;
    top: 58px;
    width: 21.532px;
    height: 19.5px;
    flex-shrink: 0;
  }

  #inputDetail {
    color: #969696;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  #inputError {
    color: #ff4f26;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  #IdCheckBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35%;
    height: 50px;
    flex-shrink: 0;
    border-radius: 5px;
    background: #c4c4c4;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const SignUpBtn = styled.div`
  position: fixed;
  display: flex; /* 내부 요소 정렬 자유롭게 */
  align-items: center;
  justify-content: center;
  bottom: 0;

  width: 393px;
  height: 100px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
`;
