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
  height: 66px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 16px 20px 16px 20px;
  align-items: end;
  justify-content: space-between;
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
  margin-top: 10px;
`;

export const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  #scrap {
    width: 23px;
    height: 22px;
    flex-shrink: 0;
  }

  #pencil {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
`;

export const Category = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  align-items: center;

  div {
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  img {
    width: 14px;
    height: 6px;
    flex-shrink: 0;
    margin-left: 10px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
`;

export const Search = styled.div`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  padding: 15px;
  margin-top: 10px;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.2);
  display: flex;
  flex-direction: row;

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  input {
    color: black;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 15px;
    border: none;
    outline: none;
    background-color: transparent;
    width: 250px;
    text-align: left;
  }
`;

export const Condition = styled.div`
  padding: 20px;
  width: 390px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: row;

  #title {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  #num {
    margin-left: 6px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  #gun {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Select = styled.div`
  display: flex;
  flex-direction: row;
  gap: 13px;
`;

export const Popular = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  #dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${(props) => (props.selected ? "#FF4F26" : "#969696")};
  }

  #detail {
    color: ${(props) => (props.selected ? "#FF4F26" : "#969696")};
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const New = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  #dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${(props) => (props.selected ? "#FF4F26" : "#969696")};
  }

  #detail {
    color: ${(props) => (props.selected ? "#FF4F26" : "#969696")};
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  gap: 20px;
`;

export const Component = styled.div`
  padding: 10px 30px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Image = styled.div`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 5px;
  background: lightgray 50% / cover no-repeat;

  img {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 5px;
    background: lightgray 50% / cover no-repeat;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-left: 20px;
  justify-content: space-between;
`;

export const Up = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 240px;
  justify-content: space-between;
`;

export const CTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 180px;

  /* ✅ 단어 기준 줄바꿈을 위한 추가 속성 */
  white-space: normal;
  overflow-wrap: break-word; /* 또는 word-wrap: break-word; */
  word-break: keep-all; /* ✅ 영어 줄바꿈 시 단어 단위 유지 */
`;

export const Scrap = styled.div`
  width: 23px;
  height: 22px;
  flex-shrink: 0;
`;

export const Down = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  #heart {
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }

  #comment {
    margin-left: 10px;
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }

  #hnum {
    margin-left: 5px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  #cnum {
    margin-left: 5px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Date = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Nav = styled.div`
  width: 390px;
  height: 104px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  padding-top: 15px;
  padding-bottom: 43px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 50px;
`;

export const NHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NRefri = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 21.406px;
    height: 28.286px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NRecipe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28.071px;
    height: 28.065px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NPur = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 25.356px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NMy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
`;

export const Sheet = styled.div`
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 390px;
  height: 390px;
  flex-shrink: 0;
  background-color: rgba(255, 79, 38, 0.85);
  color: white;
  padding: 40px 20px 20px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 11;
  transition: top 0.3s ease-in-out;

  h4 {
    margin-top: 44px;
    color: #fff;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.6px;
  }

  ul {
    margin-top: 24px;
    list-style: none;
    padding: 0;
    display: flex;
    gap: 25px;
    flex-direction: column;

    li {
      color: #fff;
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;
