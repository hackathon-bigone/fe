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
  /* 스크롤 만들기 위해 추가 */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  z-index: 5;

  height: 80px;
  width: 393px;
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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 100%;
`;

export const TwinInputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const Category = styled.div`
  height: 35px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #ff4f26;
  background: ${({ $selected }) => ($selected ? "#FF4F26" : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ $selected }) => ($selected ? "#fff" : "#FF4F26")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 5px;
`;

export const AddLinkBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 15px 0;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  #plusLink {
    width: 25px;
    height: 25px;
    flex-shrink: 0;
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

export const Input = styled.input`
  width: 350px;
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

export const InPic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 350px;
  height: 350px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.3);

  p {
    color: #969696;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  img {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }
`;

export const StepWrapper = styled.div`
  height: 500px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const InputStep = styled.div`
  width: 350px;
  height: 480px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  #step {
    margin: 15px 0;
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  #delete {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  &:focus-within {
    border-color: #ff4f26;

    #step {
      color: #ff4f26;
    }
  }
`;

export const Explanation = styled.textarea`
  width: 310px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  background: #fff;
  resize: none;
  outline: none;
  margin-top: 10px;
  padding: 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */

  &:focus {
    border-color: #ff4f26;
  }
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

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
