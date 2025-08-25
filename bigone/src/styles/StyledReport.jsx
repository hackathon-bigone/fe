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
  /* 스크롤 만들기 위해 추가 */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  z-index: 5;

  height: 80px;
  width: 390px;
  display: flex;
  flex-direction: row;
  padding: 17px; /* 아이콘 여백 조절으로 인해 변경 */
  align-items: end;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px; /*자간*/
`;

export const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Content = styled.div`
  margin-top: 60px;
  padding: 20px;
  flex: 1 1 auto;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QnAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

export const QnATitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 10px 0;
  display: flex;
`;

export const QnAContent = styled.div`
  white-space: pre-wrap;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`;

export const Date = styled.div`
  height: 25px;
  margin-top: 0;
  display: flex;
  color: #969696;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const D_Inform_gray = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const D_Inform_black = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const D_State = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(255, 79, 38, 0.1);
  padding: 4px;

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin: 15px 0;
`;

export const Divider = styled.div`
  height: 20px;
  border-left: 1px solid #d9d9d9;
`;

export const QMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 79, 38, 0.1);
`;

export const Pic = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 5px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; /* 불필요한 간격 제거 */
  }
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  #back {
    cursor: pointer;
    position: absolute;
    top: 72px;
    right: 300px;
    width: 20px;
    height: 20px;
  }
`;

export const InTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 10px 0;
`;

export const UploadBtn = styled.div`
  width: 350px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 5px;
  background: #c4c4c4;
  margin-top: 30px;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: 100%;
`;

export const Input = styled.input`
  width: 350px;
  display: flex;
  height: 50px;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 15px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #ff4f26;
  }

  #num,
  status {
    width: 170px;
    height: 50px;
    flex-shrink: 0;
  }
`;

export const Textarea = styled.textarea`
  width: 350px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 15px;
  resize: none;

  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #ff4f26;
  }
`;

export const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  gap: 10px;

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .text {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
