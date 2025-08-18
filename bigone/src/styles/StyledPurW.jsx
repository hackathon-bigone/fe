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
  margin: 10px 0;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 353px;
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

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
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

export const Modal = styled.div`
  z-index: 10;

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-wrapper {
    width: 310px;
    height: 200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    padding: 30px;
  }

  .modal-text {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .modal-detail {
    color: #969696;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  .modal-btn-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin: 10px;
  }

  .modal-close {
    display: flex;
    justify-content: center;
    align-items: center;
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

  .modal-ok {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 5px;
    background: #ff4f26;

    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
